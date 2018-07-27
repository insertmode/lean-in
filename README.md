lean-in
=======

a tool for sharing web annotations using a bookmarklet

Note: Work on this was stopped after we realized:

* proper use of CSP prevents bookmarklets from working
* any data stored by the bookmarklet could easily be accessed by all JavaScript
  in the page (meaning we'd expose annotations to the page and their
  advertisers, at the least)

Since the original idea was to enable annotating arbitrary webpages with a low
barrier of entry for somewhat programming-savvy users, we concluded that this
goal was incompatible with our desire to not expose the user's data.
At a minimum, we would expose the annotations for the current website, with our
original model we would even expose which sites someone used (including, for
example, all intranet and development sites someone has access to).

All measures we could think of massively increased complexity for minute gains
in data security.
