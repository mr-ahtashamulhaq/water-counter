import type { QueryRecord, WaterCounterStore } from "./records";
import { EMPTY_STORE } from "./records";

const STORE_KEY = "water-counter.store";
let mutationQueue: Promise<unknown> = Promise.resolve();

function enqueueMutation<T>(operation: () => Promise<T>): Promise<T> {
  const next = mutationQueue.then(operation, operation);
  mutationQueue = next.then(
    () => undefined,
    () => undefined,
  );
  return next;
}

function cloneStore(store: WaterCounterStore): WaterCounterStore {
  return structuredClone(store);
}

export async function readStore(): Promise<WaterCounterStore> {
  const result = await chrome.storage.local.get(STORE_KEY);
  const stored = result[STORE_KEY] as WaterCounterStore | undefined;

  if (!stored || stored.version !== 1) {
    return cloneStore(EMPTY_STORE);
  }

  return stored;
}

export async function writeStore(store: WaterCounterStore): Promise<void> {
  await chrome.storage.local.set({
    [STORE_KEY]: store,
  });
}

export async function saveQuery(record: QueryRecord): Promise<WaterCounterStore> {
  return enqueueMutation(async () => {
    const store = await readStore();

    if (store.paused || record.estimate.status !== "counted") {
      return store;
    }

    const conversation = store.conversations[record.conversationId] ?? {
      conversationId: record.conversationId,
      provider: record.provider,
      updatedAt: record.createdAt,
      queries: [],
    };

    const nextQueries = conversation.queries.filter((query) => query.id !== record.id);
    nextQueries.push(record);

    const nextStore: WaterCounterStore = {
      ...store,
      conversations: {
        ...store.conversations,
        [record.conversationId]: {
          ...conversation,
          updatedAt: record.createdAt,
          queries: nextQueries,
        },
      },
    };

    await writeStore(nextStore);
    return nextStore;
  });
}

export async function setPaused(paused: boolean): Promise<WaterCounterStore> {
  return enqueueMutation(async () => {
    const store = await readStore();
    const nextStore = { ...store, paused };
    await writeStore(nextStore);
    return nextStore;
  });
}

export async function clearConversation(conversationId: string): Promise<WaterCounterStore> {
  return enqueueMutation(async () => {
    const store = await readStore();
    const { [conversationId]: _removed, ...conversations } = store.conversations;
    const nextStore = { ...store, conversations };
    await writeStore(nextStore);
    return nextStore;
  });
}

export async function clearAll(): Promise<void> {
  await enqueueMutation(() => writeStore(cloneStore(EMPTY_STORE)));
}
