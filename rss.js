const DOMPARSER = new DOMParser().parseFromString.bind(new DOMParser())

fetch("urls.json").then((res) => {
  res.text().then((data) => {
    var frag = document.createDocumentFragment()
    var hasBegun = true

    JSON.parse(data).urls.forEach((u) => {
      try {
        var url = new URL(u)
      } catch(e) {
        console.error('URL Invalid');
        return
      }

      fetch(url).then((res) => {
        res.text().then((htmlTxt) => {
          try {
            let doc = DOMPARSER(htmlTxt, 'text/html')
            var feedUrl = doc.querySelector('link[type="application/rss+xml"]').href
          } catch(e) {
            console.error('Error in parsing the website');
            return
          }

          fetch(feedUrl).then((res) => {
            res.text().then((xmlTxt) => {
              try {
                let doc = DOMPARSER(xmlTxt, 'text/xml')
                let heading = document.createElement('h2')
                heading.textContent = url.hostname
                frag.appendChild(heading)
                doc.querySelectorAll('item').forEach((item) => {
                  let temp = document.importNode(document.querySelector('template').content, true)
                  let i = item.querySelector.bind(item)
                  let t = temp.querySelector.bind(temp)
                  t('a').href = !!i('link') ? i('link').innerHTML : '#'
                  t('h3').textContent = !!i('title') ? i('title').textContent : '-'
                  t('h4').textContent = !!i('pubDate') ? i('pubDate').textContent : '-'
                  t('p').innerHTML = !!i('description') ? i('description').textContent : '-'
                  frag.appendChild(temp)
                })
              } catch(e) {
                console.error('Error in parsing the feed')
              }

              if(hasBegun) {
                document.querySelector('output').textContent = ''
                hasBegun = false
              }

              document.querySelector('output').appendChild(frag)
            })
          }).catch(() => console.error('Error in fetching the RSS feed'))
        })
      }).catch(() => console.error('Error in fetching the website'))
    })
  })
}).catch(() => console.error('Error in fetching the URLs JSON'))