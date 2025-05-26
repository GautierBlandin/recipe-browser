#!/usr/bin/env node

const { execSync } = require('child_process');

function parseDate(dateStr) {
  const now = new Date();
  
  if (dateStr.includes(':')) {
    // Full format YYYY-MM-DD:HH-mm
    const [datePart, timePart] = dateStr.split(':');
    const [hours, minutes] = timePart.split('-').map(Number);
    
    if (datePart.length === 10) {
      // Full date YYYY-MM-DD
      const [year, month, day] = datePart.split('-').map(Number);
      return new Date(year, month - 1, day, hours, minutes);
    } else {
      // Time only HH-mm, use current date
      return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
    }
  } else if (dateStr.includes('-') && dateStr.split('-').length === 2) {
    // Time only HH-mm format without colon
    const [hours, minutes] = dateStr.split('-').map(Number);
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
  }
  
  throw new Error('Invalid date format. Use YYYY-MM-DD:HH-mm or HH-mm');
}

function getCommitsSince(sinceDate) {
  const isoDate = sinceDate.toISOString();
  try {
    const output = execSync(`git log --since="${isoDate}" --format="%H|%ai|%s" --reverse`, { encoding: 'utf8' });
    return output.trim().split('\n').filter(line => line.length > 0).map(line => {
      const [hash, authorDate, subject] = line.split('|');
      return {
        hash,
        originalDate: new Date(authorDate),
        subject: subject.length > 60 ? subject.substring(0, 57) + '...' : subject
      };
    });
  } catch (error) {
    console.error('Error getting commits:', error.message);
    return [];
  }
}

function generateRandomTimestamps(baseDate, count) {
  const timestamps = [];
  const baseTime = baseDate.getTime();
  const hourInMs = 60 * 60 * 1000;
  
  for (let i = 0; i < count; i++) {
    const randomOffset = Math.random() * hourInMs;
    timestamps.push(new Date(baseTime + randomOffset));
  }
  
  return timestamps.sort((a, b) => a.getTime() - b.getTime());
}

function formatTime(date) {
  return date.toLocaleTimeString('en-US', { 
    hour12: false, 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  });
}

function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit', 
    day: '2-digit'
  });
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length !== 2) {
    console.log('Usage: node time.js <since-date> <new-base-date>');
    console.log('');
    console.log('Date formats:');
    console.log('  Full: YYYY-MM-DD:HH-mm (e.g., 2024-01-15:14-30)');
    console.log('  Short: HH-mm (e.g., 14-30, assumes current date)');
    console.log('');
    console.log('Example:');
    console.log('  node time.js "2024-01-15:09-00" "14-30"');
    process.exit(1);
  }
  
  const [sinceDateStr, newBaseDateStr] = args;
  
  try {
    const sinceDate = parseDate(sinceDateStr);
    const newBaseDate = parseDate(newBaseDateStr);
    
    console.log(`Looking for commits since: ${sinceDate.toISOString()}`);
    console.log(`Will rewrite timestamps starting from: ${newBaseDate.toISOString()}`);
    
    const commits = getCommitsSince(sinceDate);
    
    if (commits.length === 0) {
      console.log('No commits found since the specified date.');
      return;
    }
    
    console.log(`Found ${commits.length} commits to rewrite.`);
    
    const newTimestamps = generateRandomTimestamps(newBaseDate, commits.length);
    
    console.log('\n=== COMMIT TIME REMAPPING ===');
    commits.forEach((commit, index) => {
      const newTime = newTimestamps[index];
      console.log(`\n${commit.hash.substring(0, 8)} "${commit.subject}"`);
      console.log(`  FROM: ${formatDate(commit.originalDate)} ${formatTime(commit.originalDate)}`);
      console.log(`  TO:   ${formatDate(newTime)} ${formatTime(newTime)}`);
    });
    
    console.log('\nStarting git filter-branch operation...');
    console.log('WARNING: This will rewrite git history. Make sure you have a backup!');
    
    // Create a single filter-branch command that handles all commits
    const envFilters = commits.map((commit, index) => {
      const timestamp = newTimestamps[index].toISOString();
      return `if [ $GIT_COMMIT = ${commit.hash} ]; then
        export GIT_AUTHOR_DATE="${timestamp}"
        export GIT_COMMITTER_DATE="${timestamp}"
      fi`;
    }).join('\n');
    
    try {
      execSync(`git filter-branch -f --env-filter '${envFilters}' HEAD`, { stdio: 'inherit' });
      console.log('\n=== REMAPPING COMPLETED ===');
      console.log('Successfully updated timestamps for all commits!');
    } catch (error) {
      console.error('Error during filter-branch operation:', error.message);
      process.exit(1);
    }
    
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}