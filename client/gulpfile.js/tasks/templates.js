
const { src, dest } = require('gulp')
const path = require('path')
const concat = require('gulp-concat')
const gulpDeclare = require('gulp-declare')
const handlebars = require('gulp-handlebars')
const wrap = require('gulp-wrap')

exports.templates = function ({ voornaam, files, publicDir }) {
  const { templates: templateFiles } = files
  return function () {
    console.log(`Taak templates wordt uitgevoerd, ${voornaam}!`)

    // Determine current dir
    const templateDir = path.resolve(__dirname, '../..')

    return src(templateFiles)
      .pipe(handlebars())
      // Wrap each template function in a call to Handlebars.template
      .pipe(wrap('Handlebars.template(<%= contents %>)'))
      // Declare template functions as properties and sub-properties of MyApp.templates
      .pipe(gulpDeclare({
        namespace: 'spa_templates',
        noRedeclare: true, // Avoid duplicate declarations
        processName: function (filePath) {
          // Allow nesting based on path using gulp-declare's processNameByPath()
          // You can remove this option completely if you aren't using nested folders
          // Drop the client/templates/ folder from the namespace path by removing it from the filePath
          return gulpDeclare.processNameByPath(path.relative(templateDir, filePath)); //windows? backslashes: \\
        }
      }))
      // Bundle all in one file
      .pipe(concat('templates.js'))

      // Write to destinations
      .pipe(dest('./dist/js'))
      .pipe(dest(`${publicDir}/js`))
  }
}
