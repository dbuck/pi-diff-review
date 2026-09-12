export type ReviewScope = "git-diff" | "branch-diff" | "last-commit" | "commit" | "all-files";

export type ChangeStatus = "modified" | "added" | "deleted" | "renamed";

export interface ReviewFileComparison {
  status: ChangeStatus;
  oldPath: string | null;
  newPath: string | null;
  displayPath: string;
  hasOriginal: boolean;
  hasModified: boolean;
}

export interface ReviewCommit {
  sha: string;
  shortSha: string;
  subject: string;
}

export interface ReviewCommitRange {
  fromCommitSha: string;
  toCommitSha: string;
  baseCommitSha: string;
}

export interface ReviewCommitRangeFile {
  fileId: string;
  comparison: ReviewFileComparison;
}

export interface ReviewCommitRangeData extends ReviewCommitRange {
  files: ReviewCommitRangeFile[];
}

export interface ReviewFile {
  id: string;
  path: string;
  worktreeStatus: ChangeStatus | null;
  hasWorkingTreeFile: boolean;
  inGitDiff: boolean;
  inBranchDiff: boolean;
  inLastCommit: boolean;
  gitDiff: ReviewFileComparison | null;
  branchDiff: ReviewFileComparison | null;
  lastCommit: ReviewFileComparison | null;
}

export interface ReviewFileContents {
  originalContent: string;
  modifiedContent: string;
}

export type CommentSide = "original" | "modified" | "file";

export interface DiffReviewComment {
  id: string;
  fileId: string;
  scope: ReviewScope;
  fromCommitSha?: string;
  toCommitSha?: string;
  displayPath?: string;
  side: CommentSide;
  startLine: number | null;
  endLine: number | null;
  body: string;
}

export interface ReviewSubmitPayload {
  type: "submit";
  overallComment: string;
  comments: DiffReviewComment[];
}

export interface ReviewCancelPayload {
  type: "cancel";
}

export interface ReviewScopeSelectedPayload {
  type: "scope-selected";
  scope: ReviewScope;
}

export interface ReviewFileStatusPayload {
  type: "file-review-status";
  fileId: string;
  reviewed: boolean;
}

export interface ReviewDisplayOptionsPayload {
  type: "display-options";
  hideUnchanged: boolean;
}

export interface ReviewRequestFilePayload {
  type: "request-file";
  requestId: string;
  fileId: string;
  scope: ReviewScope;
  comparison?: ReviewFileComparison;
  commitRange?: ReviewCommitRange;
}

export interface ReviewRequestCommitRangePayload {
  type: "request-commit-range";
  requestId: string;
  fromCommitSha: string;
  toCommitSha: string;
}

export type ReviewWindowMessage = ReviewSubmitPayload | ReviewCancelPayload | ReviewScopeSelectedPayload | ReviewFileStatusPayload | ReviewDisplayOptionsPayload | ReviewRequestFilePayload | ReviewRequestCommitRangePayload;

export interface ReviewFileDataMessage {
  type: "file-data";
  requestId: string;
  fileId: string;
  scope: ReviewScope;
  commitRange?: ReviewCommitRange;
  originalContent: string;
  modifiedContent: string;
}

export interface ReviewFileErrorMessage {
  type: "file-error";
  requestId: string;
  fileId: string;
  scope: ReviewScope;
  commitRange?: ReviewCommitRange;
  message: string;
}

export interface ReviewCommitRangeDataMessage {
  type: "commit-range-data";
  requestId: string;
  range: ReviewCommitRangeData;
}

export interface ReviewCommitRangeErrorMessage {
  type: "commit-range-error";
  requestId: string;
  fromCommitSha: string;
  toCommitSha: string;
  message: string;
}

export type ReviewHostMessage = ReviewFileDataMessage | ReviewFileErrorMessage | ReviewCommitRangeDataMessage | ReviewCommitRangeErrorMessage;

export interface ReviewWindowData {
  repoRoot: string;
  files: ReviewFile[];
  commits: ReviewCommit[];
  branchBaseSha: string | null;
  initialScope: ReviewScope | null;
  reviewedFiles: Record<string, boolean>;
  hideUnchanged: boolean;
}
