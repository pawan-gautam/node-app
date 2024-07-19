import { danger, warn, fail, message } from 'danger';

// Check for modified files
const modifiedFiles = danger.git.modified_files;

if (modifiedFiles.length === 0) {
    warn('No files were modified. Are you sure this PR is necessary?');
}

// Check for missing documentation
const hasDocumentationChanges = modifiedFiles.some(file =>
    file.includes('docs/') || file.endsWith('.md')
);
if (!hasDocumentationChanges) {
    warn('No documentation changes. Please consider updating the documentation.');
}

// Check for code style violations
const hasLintChanges = modifiedFiles.some(file =>
    file.endsWith('.js') || file.endsWith('.ts')
);
if (hasLintChanges) {
    // You can use your preferred linting tool here (e.g., ESLint, TSLint)
    // Example: run linting script and parse the results
    // const lintResults = await runLinting();
    // if (lintResults.errors.length > 0) {
    //     fail('Linting errors found. Please fix them before merging.');
    // }
    warn('Linting checks skipped. Please consider adding linting to your project.');
}

// Check for test coverage
const testCoverage = parseFloat(danger.github.utils.fileContents('coverage/coverage-summary.json')) || 0;
const minCoverage = 80; // Define your minimum required test coverage
if (testCoverage < minCoverage) {
    fail(`Test coverage is below ${minCoverage}%. Please improve test coverage.`);
}

// Check for excessive file changes
if (modifiedFiles.length > 10) {
    warn('Excessive file changes detected. Please keep changes focused.');
}

// Check for descriptive PR titles
const prTitle = danger.github.pr.title.toLowerCase();
if (!prTitle.includes('fix') && !prTitle.includes('feature')) {
    warn('Please use a descriptive PR title (e.g., "Fix issue #123", "Add feature X").');
}

// You can add more rules and checks as needed

// Provide a summary message
message('Code review checks completed. Please review the feedback.');

