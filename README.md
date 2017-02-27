# QuillJS table

Test lab for creating `TABLE` functionality in Quilljs using Containers.

Code of quill is included in project so we can easily play with it in our tests.

## Run

Try by opening `quilljs-extended-toolbar/contain.html` in a browser.

## Aim of this project

While the code is at this point more or less hacked together,
long term goal is to provide enough material to understand table behavior
so we end up with stable working table solution for quill.

Please feel free to add your own files and directories to play with the concept.

## Progress so far
* `TABLE`, `TR` and `TD` are containers - it is possible to have multiple block blots in `TD`
* all tables, rows and cells are identified by random strings and optimize merge only those with the same id.
* there is code allowing to add rows and columns to tables (accessible by wrongly named table buttons in toolbar)

## Known issues
It is very early stage so there is a lot of issues with current state.
Still there are some worth to mention which should be dealt with.

* Pressing enter in table cell leads to inserting container into the container. It is hacked in ContainBlot insertBefore function by striping parent container and optimize then merge it fine. But it should be resolved earlier on MutationRecord creation or probably somewhere on update at `Scroll` or `Container` level.
* Lists (number or bullet) in cell upon enter loose list format on previous line but keeps it on actual.
* Delete and backspace behaviour on tables should be either disabled or should have some well defined behavior. Now it is pretty easy to destroy table in ugly way.
* Definition of TableTrick is extra badly hacked in just to test if adding of rows and cols is easily possible - which is.
* Organization of code is hectic as it was not refactored even once from our first attempts to put this all to work.
* ...
