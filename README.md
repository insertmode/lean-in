lean-in
=======

a tool for sharing web annotations using a bookmarklet

Note: Work on this was stopped after we realized:

* proper use of CSP prevents bookmarklets from working
* any data stored by the bookmarklet could easily be accessed by all JavaScript
in the page (meaning we'd expose annotations to the page and their advertisers)

Since the original idea was to enable annotating arbitrary webpages with a low
barrier for somewhat programming-savvy users, we concluded that this goal was
not reachable in a way that would not expose the user's data, at least the
annotations about the current page. All measures we could think of massively
increased complexity for minute gains in data security.
