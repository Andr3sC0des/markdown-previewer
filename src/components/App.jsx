import React, { useEffect, useRef, useState } from 'react'
import hljs from 'highlight.js'
import 'highlight.js/styles/obsidian.css'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

marked.setOptions({
  gfm: true,
  breaks: true
})

const App = () => {
  const defaultText = "# Welcome to my React Markdown Previewer!\n\n## This is a sub-heading...\n### And here's some other cool stuff:\n\nHeres some code, `<div></div>`, between 2 backticks.\n\n```\n// this is multi-line code:\n\nfunction anotherExample(firstLine, lastLine) {\n  if (firstLine == '```' && lastLine == '```') {\n    return multiLineCode;\n  }\n}\n```\n\nYou can also make text **bold**... whoa!\nOr _italic_.\nOr... wait for it... **_both!_**\nAnd feel free to go crazy ~~crossing stuff out~~.\n\nThere's also [links](https://www.freecodecamp.org), and\n> Block Quotes!\n\nAnd if you want to get really crazy, even tables:\n\nWild Header | Crazy Header | Another Header?\n------------ | ------------- | -------------\nYour content can | be here, and it | can be here....\nAnd here. | Okay. | I think we get it.\n\n- And of course there are lists.\n  - Some are bulleted.\n     - With different indentation levels.\n        - That look like this.\n\n\n1. And there are numbered lists too.\n1. Use just 1s if you want!\n1. And last but not least, let's not forget embedded images:\n\n![freeCodeCamp Logo](https://res.cloudinary.com/dbihhif3d/image/upload/v1671114407/portfolio/logo_adfszy.svg)"
  const textarea = useRef(null)
  const [text, setText] = useState([defaultText])

  const addingBlank = () => {
    const anchors = document.querySelectorAll('a')
    anchors.forEach((anchor) => {
      anchor.target = '_blank'
      console.log(anchor.target)
    })
  }

  const handleTextarea = () => {
    const preview = document.querySelector('.preview')
    const texto = textarea.current.value
    const rawMarkup = marked.parse(texto)
    DOMPurify.sanitize(rawMarkup)
    setText(rawMarkup)
    preview.innerHTML = `${text}`
    hljs.highlightAll()
    addingBlank()
  }

  useEffect(() => {
    handleTextarea()
    hljs.highlightAll()
    textarea.current.focus()
  }, [text])

  return (
    <>
      <section className='markdown'>
        <article className='editor'>
          <textarea id='editor' defaultValue={defaultText} ref={textarea} onLoad={handleTextarea} onChange={handleTextarea} className='editor__textarea' name='' cols='30' rows='10' />
        </article>

        <article id='preview' className='preview'>
          Preview
        </article>

      </section>
    </>
  )
}

export default App
