# Commit Policy

The project uses small, frequent commits during implementation. Each meaningful file creation, isolated change, test fix, or documentation update should be committed as soon as it is complete and verified. Unrelated changes must not be grouped into one commit.

Every commit subject must contain **one to three words**, use letters or numbers separated by single spaces, and contain **no punctuation**. Examples include `Add Adapter`, `Fix Totals`, `Update Tests`, and `Polish Popup`.

Before each commit, check the staged file list, run the smallest relevant validation, confirm that no secrets or chat data are staged, and validate the commit subject with the repository check. Pushes should happen after coherent milestones, not after every local commit, so the remote history remains useful while the local history stays granular.

Public repository creation and the first push require explicit user approval. Until that approval is given, work remains local and dry-run checks are the maximum safe GitHub test.
