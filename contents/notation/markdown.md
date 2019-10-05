% Markdown

Original: https://guides.github.com/features/mastering-markdown/

# Headers
# This is an \<h1\> tag
## This is an \<h2\> tag
###### This is an &lt;h6&gt; tag

```
# This is an \<h1\> tag
## This is an \<h2\> tag
###### This is an &lt;h6&gt; tag
```

# Emphasis
*This text will be italic*
_This will also be italic_

**This text will be bold**
__This will also be bold__

_You **can** combine them_

```
*This text will be italic*
_This will also be italic_

**This text will be bold**
__This will also be bold__

_You **can** combine them_
```

# Lists
## Unordered
* Item 1
* Item 2
  * Item 2a
  * Item 2b

```
* Item 1
* Item 2
  * Item 2a
  * Item 2b
```

## Ordered
1. Item 1
1. Item 2
1. Item 3
  1. Item 3a
  1. Item 3b

```
1. Item 1
1. Item 2
1. Item 3
  1. Item 3a
  1. Item 3b
```

# Images
![Image of Yaktocat](https://octodex.github.com/images/yaktocat.png)

```
![Image of Yaktocat](https://octodex.github.com/images/yaktocat.png)
Format: ![Alt Text](url)
```

# Links
https://github.com - automatic!
[GitHub](https://github.com)

```
https://github.com - automatic!
[GitHub](https://github.com)
```

# Blockquotes
As Kanye West said:

> We're living the future so
> the present is our past.

```
As Kanye West said:

> We're living the future so
> the present is our past.
```

# Inline code
I think you should use an
`<addr>` element here instead.

```
I think you should use an
`<addr>` element here instead.
```

# Syntax highlighting
```javascript
function fancyAlert(arg) {
  if (arg) {
    $.facebox({div: '#foo'})
  }
}
```

````
```javascript
function fancyAlert(arg) {
  if (arg) {
    $.facebox({div: '#foo'})
  }
}
```
````

You can also simply indent your code by four spaces:

    function fancyAlert(arg) {
      if (arg) {
        $.facebox({div: '#foo'})
      }
    }

```
    function fancyAlert(arg) {
      if (arg) {
        $.facebox({div: '#foo'})
      }
    }
```

Here's an example of Python code without syntax highlighting:
```
def foo():
    if not bar:
        return True
```

````
```
def foo():
    if not bar:
        return True
```
````

# Task Lists
- [x] @mentions, #refs, [links](), **formatting**, and <del>tags</del> supported
- [x] list syntax required (any unordered or ordered list supported)
- [x] this is a complete item
- [ ] this is an incomplete item

```
- [x] @mentions, #refs, [links](), **formatting**, and <del>tags</del> supported
- [x] list syntax required (any unordered or ordered list supported)
- [x] this is a complete item
- [ ] this is an incomplete item
```

# Tables
You can create tables by assembling a list of words and dividing them with hyphens `-` (for the first row), and then separating each column with a pipe `|`:

```
First Header | Second Header
------------ | -------------
Content from cell 1 | Content from cell 2
Content in the first column | Content in the second column
```

Would become:

First Header | Second Header
------------ | -------------
Content from cell 1 | Content from cell 2
Content in the first column | Content in the second column

# Strikethrough
Any word wrapped with two tildes (like `~~this~~`) will appear ~~crossed out~~.

# Emoji
GitHub supports emoji! :sunglasses: (`:sunglasses:`)

To see a list of every image they support, check out the [Emoji Cheat Sheet](https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md).