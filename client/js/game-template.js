
Game.Template = (function () {
  /**
   * @param {String} templateName template, period-separated
   * @returns {Handlebars} template
   */
  const getTemplate = function (templateName) {
    let template = window.spa_templates
    templateName.split(/\./g).forEach(name => {
      template = template ? (template[name] || null) : null
    })
    return template
  }

  /**
   * @param {String} templateName Template name
   * @param {Object} data Data to parse with
   * @returns {String}
   */
  const parseTemplate = function (templateName, data) {
    const template = getTemplate(templateName)
    return (template && typeof template === 'function') ? template(data) : null
  }

  return { getTemplate, parseTemplate }
})()
