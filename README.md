# Hugo Site Template

Template for a hugo site that supports short pearls, project hubs, blog and search

## Features
- Bootstrap, responsive site.
- [Project Hubs](https://24ways.org/2013/project-hubs/).
- Short tweets/gems/pearls of wisdom etc.
- Articles
- Blog entries
- Local javascript browser based search across pages using [Lunr](http://lunrjs.com/)

![Home Page](/static/img/ss_homepage.png?raw=true)
![Project Hub](/static/img/ss_projecthub.png?raw=true)
![Search Page](/static/img/ss_search.png?raw=true)

## How-to
- Clone
- Change config.toml
- Install [Hugo](https://gohugo.io/)
- Change static/img/brand_tn.jpg to your logo image - 48x48!
- Background image for home page is also there.
- Run `deploy.sh dev` and navigate to the URL it prints. You can see your site.
- Change first line in `deploy.sh` to rsync up the developed site to your Apache/nginx/IIS. For syncup, you just 
  need to run `deploy.sh` with no arguments. It will build and upload.
- Sample content is organized in sub-directories in `content`. Take a look at that.
- Content can be .html or .md. Samples are there.
- Delete placeholder content in `pearls, post, project, articles` etc and add your own. Or simply add `draft=true` to the front matter - that should keep the file 
  but not show it on the site (theory, not tested!)
- If you change `search/start.html`, you should know what you are doing!
- Search for "TODO" and change to appropriate content. eg: Your github/linkedin/facebook etc.

## Layouts
- See `layouts` - it is fairly self explanatory.
- Currently the links are all to CDN hosted bootstrap, font-awesome, jquery etc. Change in `layouts/partials/header.includes.html` to
  change to other swatches or your own local stuff. If you build your own bootstrap look and feel, files have to go in `static` -
  under `css, img, js` etc.

## Not supported
- Big one: Hugo theme configuration is not considered.
- Only one level of project directories are supported.

### Credits
- Sourced from hugo example in documentation
- [Project Hub Theme](https://github.com/vjeantet/hugo-theme-projecthub).
