import { readdirSync, statSync, unlinkSync } from 'fs';
import { join } from 'path';

function deleteRecursively(dir, pattern) {
  let files = readdirSync(dir).map(file => join(dir, file));
  for(let file of files) {
    const stat = statSync(file);
    if (stat.isDirectory()) {
        deleteRecursively(file, pattern);
    } else {
      if (pattern.test(file)) {
        console.log(`Deleting file: ${file}...`);
        // Uncomment the next line once you're happy with the files being logged!
        try { 
          unlinkSync(file);
        } catch (err) {
          console.error(`An error occurred deleting file ${file}: ${err.message}`);
        } 
      }
    }
  }
}

deleteRecursively('.', /\.json$/);
