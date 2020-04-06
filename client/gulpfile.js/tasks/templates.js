
const { src, dest } = require('gulp')
const path = require('path')
const concat = require('gulp-concat')
const gulpDeclare = require('gulp-declare')
const handlebars = require('gulp-handlebars')
const wrap = require('gulp-wrap')
const merge = require('merge-stream')

exports.templates = function ({ voornaam, files, publicDir }) {
  const { partials: partialFiles, templates: templateFiles } = files.handlebars
  return function () {
    console.log(`Taak templates wordt uitgevoerd, ${voornaam}!`)

    // Determine current dir
    const templateDir = path.resolve(__dirname, '../..')

    const process = (glob, wrapargs, cb) => {
      const work = src(glob)
        // Parse using Handlebars
        .pipe(handlebars())
        // Wrap each template function in a call to Handlebars.template
        .pipe(wrap(...wrapargs))

      // Allow for cb work
      return cb ? work.pipe(cb) : work
    }

    // Build templates
    const templates = process(
      templateFiles,
      ['Handlebars.template(<%= contents %>)'],
      gulpDeclare({
        namespace: 'spa_templates',
        noRedeclare: true, // Avoid duplicate declarations
        processName: function (filePath) {
          // Allow nesting based on path using gulp-declare's processNameByPath()
          // You can remove this option completely if you aren't using nested folders
          // Drop the client/templates/ folder from the namespace path by removing it from the filePath
          return gulpDeclare.processNameByPath(path.relative(templateDir, filePath)); //windows? backslashes: \\
        }
      })
    )

    // Build partials
    const partials = process(
      partialFiles,
      [
        'Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Handlebars.template(<%= contents %>));',
        {},
        {
          imports: {
            processPartialName(fileName) {
              // Strip the extension and the underscore
              // Escape the output with JSON.stringify
              return JSON.stringify(path.basename(fileName, '.js').substr(1));
            }
          }
        }
      ]
    )

    // Merge files
    return merge(partials, templates)
        // Bundle all in one file
        .pipe(concat('templates.js'))

        // Write to destinations
        .pipe(dest('./dist/js'))
        .pipe(dest(`${publicDir}/js`))
  }
}
