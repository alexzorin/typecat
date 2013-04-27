typecat
=======
Small [PhantomJS][1] script to rip a font-face/family from Adobe TypeK1t.

Usage
------
`phantomjs typecat.js museo-slab [other] [font] [names]` 

will generate `.ttf` files in the cwd, following a `font-name_[weight]_[style].ttf`.

Ripped fonts seem like they don't work (at least in Windows) but a browser will properly parse them. If you need other tools to read them, try a [font converter][2] to fix the format. 

Disclaimer/Pirating
-------------------
(If you're looking to avoid paying for web fonts, keep walking - this won't really help you with cross-platform consistency and such, it's more for being able to consistently use the same fonts in mockups).

Project not associated with Adobe.


  [1]: http://phantomjs.com/
  [2]: http://www.freefontconverter.com/
