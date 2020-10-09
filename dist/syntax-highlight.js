
/* 
selection code credit to Brian Mearns 💪 
check here 👉 https://codepen.op/brianmearns/pen/YVjZWw
*/

const langRegex = {
    'js': {
        doubleString: (s) => s.replace(/"(.*?)"/g, `<span class="string">"$1"</span>`),
        singleString: (s) => s.replace(/'(.*?)'/g, `<span class="string">'$1'</span>`),
        numberString: (s) => s.replace(/(\d+)(?=[^\d])/g, `<span class="num">$1</span>`),
        boolString: (s) => s.replace(/\b(false|true)(?=[^\w])/g, `<span class="bool">$1</span>`),
        // operator: (s) => s.replace(/[+\/*-]/g, `<span class="special-operator">$1</span>`),
        globalObj: (s) => s.replace(/\b(document|window|Array|String|Set|Object|Number|Map|\$)(?=[^\w])/g, `<span class="special-js-glob">$1</span>`),
        // TODO: work on function
        keyChar: (s) => s.replace(/\b(new|if|do|for|while|switch|of|in|break|this|import|require|foreach)(?=[^\w])/g, `<span class="special-reg">$1</span>`),
        specialChar: (s) => s.replace(/\b(getElementById|getElementsBy(ClassName|TagName|Name)|querySelector|querySelectorAll|typeof|instanceof)(?=[^\w])/g, `<span class="special-js">$1</span>`),
        varDeclarator: (s) => s.replace(/\b(var|let|const|function)(?=[^\w])/g, `<span class="special-var">$1</span>`),
        blockComment: (s) => s.replace(/(\/\*.*\*\/)/g, `<span class="special-comment">$1</span>`),
        inlineComment: (s) => s.replace(/(\/\/.*)/g, `<span class="special-comment">$1</span>`)
    },
    'java': {
        doubleString: (s) => s.replace(/"(.*?)"/g, `<span class="string">"$1"</span>`),
        singleString: (s) => s.replace(/'(.*?)'/g, `<span class="string">'$1'</span>`),
        numberString: (s) => s.replace(/(\d+)(?=[^\d])/g, `<span class="num">$1</span>`),
        boolString: (s) => s.replace(/\b(false|true)(?=[^\w])/g, `<span class="bool">$1</span>`),
        // operator: (s) => s.replace(/[+\/*-]/g, `<span class="special-operator">$1</span>`),
        globalObj: (s) => s.replace(/\b(int|double|float|byte|char|Double|Integer|Set|Map|String|Character|List|ArrayList|LinkedList|HashMap|Tree|Short|Long|Byte|Float|\$)(?=[^\w])/g, `<span class="special-js-glob">$1</span>`),
        // TODO: work on function
        keyChar: (s) => s.replace(/\b(new|if|do|for|while|switch|of|in|break|this|import|require|foreach)(?=[^\w])/g, `<span class="special-reg">$1</span>`),
        specialChar: (s) => s.replace(/\b(main)(?=[^\w])/g, `<span class="special-js">$1</span>`),
        varDeclarator: (s) => s.replace(/\b(var|let|const|function)(?=[^\w])/g, `<span class="special-js">$1</span>`),
        blockComment: (s) => s.replace(/(\/\*.*\*\/)/g, `<span class="special-comment">$1</span>`),
        inlineComment: (s) => s.replace(/(\/\/.*)/g, `<span class="special-comment">$1</span>`)
    },
    'php': {
        doubleString: (s) => s.replace(/"(.*?)"/g, `<span class="string">"$1"</span>`),
        singleString: (s) => s.replace(/'(.*?)'/g, `<span class="string">'$1'</span>`),
        operator: (s) => s.replace(/(\+|\=\=|;)/g, `<span class="special-operator">$1</span>`),
        globalObj: (s) => s.replace(/\b(\$)(?=[^\w])/g, `<span class="special-js-glob">$1</span>`),
        // TODO: work on function
        keyChar: (s) => s.replace(/\b(new|if|do|for|while|switch|of|in|break|this)(?=[^\w])/g, `<span class="special-reg">$1</span>`),
        specialFunc: (s) => s.replace(/\b(define|echo|print_r|var_dump)(?=[^\w])/g, `<span class="special-php">$1</span>`),
        blockComment: (s) => s.replace(/(\/\*.*\*\/)/g, `<span class="special-comment">$1</span>`),
        inlineComment: (s) => s.replace(/(\/\/.*)/g, `<span class="special-comment">$1</span>`),
    },
    'css': {
        // classString: (s) => s.replace(/[.#]*(?=\s*{)/g, `<span class="num">$1</span>`),
        doubleString: (s) => s.replace(/"(.*?)"/g, `<span class="string">"$1"</span>`),
        keyElement: (s) => s.replace(/\b(main|div|article|abbr|span|input|button|label|textarea|abbr|blockquote|br|hr|html|body|head)(?=[^\w])/g, `<span class="special-js-glob">$1</span>`),
        operator: (s) => s.replace(/({|}|\(|\)|:)(?=[^.])/g, `<span class="special-operator">$1</span>`),
        // TODO classString and ID
        comment: (s) => s.replace(/(\/\*.*\*\/)/g, `<span class="special-comment">$1</span>`)
    },
    'sql': {
        doubleString: (s) => s.replace(/"(.*?)"/g, `<span class="string">"$1"</span>`),
        singleString: (s) => s.replace(/'(.*?)'/g, `<span class="string">'$1'</span>`),
        operator: (s) => s.replace(/(\+|\=\=|;)/g, `<span class="special-operator">$1</span>`),
        keyChar: (s) => s.replace(/\b(CREATE|ALL|DATABASE|TABLE|GRANT|PRIVILEGES|IDENTIFIED|FLUSH|SELECT|UPDATE|DELETE|TRUNCATE|INSERT|FROM|WHERE|ORDER|BY|GROUP|LIMIT|INNER|OUTER|AS|ON|COUNT|CASE|TO|IF|WHEN|BETWEEN|AND|OR)(?=[^\w])/g, `<span class="special-sql">$1</span>`),
        comment: (s) => s.replace(/(\/\*.*\*\/)/g, `<span class="special-comment">$1</span>`)
    },
    'html': {
        tagReg: (s) => s.replace(/(&lt;[^\&]*&gt;)/g, `<span class="html-reg">$1</span>`)
    },
    'py': {
        // singleString: (s) => s.replace(/'(.*?)'/g, `<span class="string">'$1'</span>`),
        // doubleString: (s) => s.replace(/"(.*?)"/g, `<span class="string">"$1"</span>`),
        // tripleString: (s) => s.replace(/'''(.*?)'''/g, `<span class="string">'''$1'''</span>`),
        // numberString: (s) => s.replace(/(\d+)(?=[^\d])/g, `<span class="num">$1</span>`),
        boolString: (s) => s.replace(/\b(false|true)(?=[^\w])/g, `<span class="bool">$1</span>`),
        // operator: (s) => s.replace(/[+\/*-]/g, `<span class="special-operator">$1</span>`),
        // TODO: work on function
        keyChar: (s) => s.replace(/\b(new|if|do|for|while|switch|of|in|break|this|import|require|foreach)(?=[^\w])/g, `<span class="special-reg">$1</span>`),
        specialChar: (s) => s.replace(/\b(class|def)(?=[^\w])/g, `<span class="special-js">$1</span>`),
        varDeclarator: (s) => s.replace(/\b(init|randint|print)(?=[^\w])/g, `<span class="special-var">$1</span>`),
        inlineComment: (s) => s.replace(/(\#.*)/g, `<span class="special-comment">$1</span>`)
    },
};


(
    function() {
        // Define the constructor
        this.Highlighter = function() {

            var defaults = {
                className: 'my-highlighter',
                theme: 'dark',
                maxHeight: 240 // null for fit-content
            }

            if (arguments[0] && typeof arguments[0] === "object") {
                this.options = Object.assign({ }, defaults, arguments[0])
            }

            this.codeElements = document.querySelectorAll(`pre div${this.options.className.trim().length > 0 ? `.${this.options.className}` : ''}`);
            
            this.codeElements.forEach(elem => {
                elem.classList.add("my-editor-style")
                elem.parentElement.classList.add("my-editor-style-parent");
                if (elem.innerHTML.length <= 0) 
                    elem.innerHTML = "\n\n\n\n\n"

                if (this.options.theme.toLowerCase() === "light")
                    elem.classList.add("light")
                else 
                    elem.classList.remove("light")

                if (this.options.maxHeight)
                    elem.style.maxHeight = `${this.options.maxHeight}px`
                
                
                 // is editable
                 var shouldAnimate = elem.getAttribute("data-animate") === "true";
                 if (shouldAnimate) {
                    elem.classList.add("animateIn");
                 }

                // is editable
                var isEditable = elem.getAttribute("data-editable") === "true";
                if (isEditable) {
                    elem.setAttribute("spellcheck", false)
                    elem.setAttribute("contenteditable", true)
                    elem.setAttribute("lang", "--")
                    elem.addEventListener('input', () => updateEditor(elem))
                    elem.addEventListener('keydown', updateEditorText)
                }

                // is editable
                var showLabel = elem.getAttribute("data-showLabel") === "true";
                if (showLabel) {
                    const label = document.createElement("label")
                    label.textContent = elem.getAttribute("data-filename")
                    elem.parentElement.append(label)
                }
            })
        }

        // public functions

        this.Highlighter.prototype.highlight = function() {
            this.codeElements.forEach(elem => renderHightlight(elem))
        }

        this.Highlighter.prototype.highlightOne = function(elem) {
            renderHightlight(elem)
        }

        this.Highlighter.prototype.setTheme = function(theme) {
            theme = theme.toLowerCase()
            if (theme === "dark")
                this.options.theme = "dark"
            else if (theme === "light")
                this.options.theme = "light"
            
            this.codeElements.forEach(elem => {
                if (this.options.theme.toLowerCase() === "light")
                    elem.classList.add("light")
                else 
                    elem.classList.remove("light")
            })
        }

        // private utility
        const renderHightlight = function(elem) {
            let string = elem.textContent,
            language = extractLanguage(elem.getAttribute("data-filename"));
            const regex = langRegex[language];
            // for (filter in regex) {
            //     string = regex[filter](string)
            // }

            
            if (language === 'js')
                string = jsHighlight(string)
            else if (language === 'css')
                string = cssHighlight(string)
            // else
            //     string = htmlHighlight(string)


            elem.innerHTML = string;
        }

        function extractLanguage(filename) {
            return (filename || "index.js").trim().split(".")[1];
        }

        function getTextSegments(elem) {
            const textSegments = [];
            Array.from(elem.childNodes).forEach((node) => {
                switch (node.nodeType) {
                    case Node.TEXT_NODE:
                        textSegments.push({ text: node.nodeValue, node })
                        break;
                    case Node.ELEMENT_NODE:
                        textSegments.splice(textSegments.length, 0, ...(getTextSegments(node)))
                        break;
                    default:
                        throw new Error(`Unexpected node type: ${node.nodeType}`)
                }
            })
            return textSegments;
        }

        function updateEditor(elem) {
            const sel = window.getSelection();
            const textSegments = getTextSegments(elem);
            const textContent = textSegments.map(({ text }) => text).join('');
            let anchorIndex = null;
            let focusIndex = null;
            let currentIndex = 0;
            
            textSegments.forEach(({ text, node }) => {
                if (node === sel.anchorNode) {
                    anchorIndex = currentIndex + sel.anchorOffset;
                }
                if (node === sel.focusNode) {
                    focusIndex = currentIndex + sel.focusOffset;
                }
                currentIndex += text.length;
            })

            renderHightlight(elem)
            restoreSelection(elem, anchorIndex, focusIndex)            
        }

        function updateEditorText(e) {
            const elem = e.target;
            const sel = window.getSelection();
            const range = sel.getRangeAt(0),
            text = sel.toString()
            let selParams = {
                anchorNode: sel.anchorNode,
                anchorOffset: sel.anchorOffset,
                focusNode: sel.focusNode,
                focusOffset: sel.focusOffset
            }
            
            switch (e.key) {
                case "Enter":
                    e.preventDefault()
                    range.deleteContents()
                    range.insertNode(document.createTextNode("\n"))
                    insertCursorAfter(elem, selParams, 1)
                    break;
                case "Tab":
                    e.preventDefault()
                    range.deleteContents()
                    range.insertNode(document.createTextNode("  "))
                    insertCursorAfter(elem, selParams, 2)
                    break;
                case '"':
                case "'":
                    e.preventDefault()
                    range.deleteContents()
                    range.insertNode(document.createTextNode(`${e.key}${text}${e.key}`))
                    insertCursorBetween(elem, selParams, text.length)
                    break;
                case '{':
                    e.preventDefault()
                    range.deleteContents()
                    var textNode = document.createTextNode(`{${text}}`)
                    range.insertNode(textNode)
                    insertCursorBetween(elem, selParams, text.length)
                    break;
                case '(':
                    e.preventDefault()
                    range.deleteContents()
                    var textNode = document.createTextNode(`(${text})`)
                    range.insertNode(textNode)
                    insertCursorBetween(elem, selParams, text.length)
                    break;
                case '[':
                    e.preventDefault()
                    range.deleteContents()
                    range.insertNode(document.createTextNode(`[${text}]`))
                    insertCursorBetween(elem, selParams, text.length)
                    break;
                case '<':
                case '>':
                    e.preventDefault()
                    range.deleteContents()
                    range.insertNode(document.createTextNode(`${e.key === '<' ? '&lt;' : '>'}`))
                    insertCursorBetween(elem, selParams, text.length)
                    break;
            }
        }

        function insertCursorAfter(elem, sel, offset) {
            const textSegments = getTextSegments(elem)
            let anchorIndex = null
            let focusIndex = null
            let currentIndex = 0
            
            textSegments.forEach(({ text, node }) => {
                if (node === sel.anchorNode)
                    anchorIndex = currentIndex + sel.anchorOffset
                if (node === sel.focusNode)
                    focusIndex = currentIndex + sel.focusOffset
                currentIndex += text.length
            })

            anchorIndex = focusIndex = focusIndex + offset
            restoreSelection(elem, anchorIndex, focusIndex)
        }

        function insertCursorBetween(elem, sel, offset) {
            const textSegments = getTextSegments(elem)
            let anchorIndex = null
            let focusIndex = null
            let currentIndex = 0
            
            textSegments.forEach(({ text, node }) => {
                if (node === sel.anchorNode)
                    anchorIndex = currentIndex + sel.anchorOffset

                if (node === sel.focusNode)
                    focusIndex = currentIndex + sel.focusOffset
                currentIndex += text.length
            })

            anchorIndex = focusIndex < anchorIndex ? focusIndex + 1 : anchorIndex + 1;
            focusIndex = anchorIndex + offset

            restoreSelection(elem, anchorIndex, focusIndex)
        }

        function restoreSelection(elem, absoluteAnchorIndex, absoluteFocusIndex) {
            const sel = window.getSelection()
            const textSegments = getTextSegments(elem)
            let anchorNode = elem,
            anchorIndex = 0,
            focusNode = elem,
            focusIndex = 0,
            currentIndex = 0;

            textSegments.forEach(({ text, node }) => {
                const startIndexOfNode = currentIndex
                const endIndexOfNode = startIndexOfNode + text.length
                if (startIndexOfNode <= absoluteAnchorIndex && absoluteAnchorIndex <= endIndexOfNode) {
                    anchorNode = node
                    anchorIndex = absoluteAnchorIndex - startIndexOfNode
                }
                if (startIndexOfNode <= absoluteFocusIndex && absoluteFocusIndex <= endIndexOfNode) {
                    focusNode = node
                    focusIndex = absoluteFocusIndex - startIndexOfNode
                }
                currentIndex += text.length
            })
            
            sel.setBaseAndExtent(anchorNode, anchorIndex, focusNode, focusIndex)

        }

        function extract(str, start, end, func, repl) {
            var s, e, d = "", a = []
            while(str.search(start) > -1) {
                s = str.search(start)
                e = str.indexOf(end, s)
                if (e == -1) {
                    e = str.length
                }
                if (repl) {
                    a.push(func(str.substring(s, e + (end.length))))
                    str = str.substring(0, s) + repl + str.substr(e + end.length)
                } else {
                    d += str.substring(0, s);
                    d += func(str.substring(s, e + end.length))
                }
            }
            this.rest = d + str
            this.arr = a
            
        }

        function htmlHighlight(txt) {
            var rest = txt, done = "", php, comment, angular, startPos, endPos, note, i;
            comment = new extract(rest, "&lt;!--", "--&gt;", commentHighlight, "MYHIGHLIGHTERCOMMENT")
            rest = comment.rest
            while (rest.indexOf("&lt;") > -1) {
                note = ""
                startPos = rest.indexOf("&lt;")
                if (rest.substr(startPos, 9).toUpperCase() === "&LT:STYLE")
                    note = "css"
                if (rest.substr(startPos, 10).toUpperCase() === "&LT:SCRIPT")
                    note = "javascript"

                endPos = rest.indexOf("&gt;", startPos)
                if (endPos == -1)
                    endPos = rest.length
                done += rest.substring(0, startPos)
                done += tagHightlight(rest.substring(startPos, endPos + 4))
                rest = rest.substr(endPos + 4)
                if (note === "css") {
                    endPos = rest.indexOf("&lt;/style&gt;");
                    if (endPos > -1) {
                        done += cssHighlight(rest.substring(0, endPos))
                        rest = rest.substr(endPos)
                    }
                }
                if (note === "javascript") {
                    endPos = rest.indexOf("&lt;/script&gt;");
                    if (endPos > -1) {
                        done += jsHighlight(rest.substring(0, endPos))
                        rest = rest.substr(endPos)
                    }
                }
            }
            rest = done + rest
            for (i = 0; i < comment.arr.length; i++)
                rest.replace("MYHIGHLIGHTERCOMMENT", comment.arr[i])
            return rest
        }

        function tagHightlight(txt) {
            var rest = txt, done = "", startpos, endpos, result;
            while (rest.search(/(\s|<br>)/) > -1) {    
                startpos = rest.search(/(\s|<br>)/);
                endpos = rest.indexOf("&gt;");
                if (endpos == -1) {endpos = rest.length;}
                done += rest.substring(0, startpos);
                done += attributeHighlight(rest.substring(startpos, endpos));
                rest = rest.substr(endpos);
            }
            result = done + rest;
            result = `<span class="special-html">&lt;</span>` + result.substring(4);
            if (result.substr(result.length - 4, 4) == "&gt;") {
                result = result.substring(0, result.length - 4) + `<span class="special-html">&gt;</span>`;
            }
            return `<span class="special-html">${result}</span>`;
        }

        function attributeHighlight(txt) {
            var rest = txt, done = "", startpos, endpos, singlefnuttpos, doublefnuttpos, spacepos;
            while (rest.indexOf("=") > -1) {
                endpos = -1;
                startpos = rest.indexOf("=");
                singlefnuttpos = rest.indexOf("'", startpos);
                doublefnuttpos = rest.indexOf('"', startpos);
                spacepos = rest.indexOf(" ", startpos + 2);
                if (spacepos > -1 && (spacepos < singlefnuttpos || singlefnuttpos == -1) && (spacepos < doublefnuttpos || doublefnuttpos == -1)) {
                    endpos = rest.indexOf(" ", startpos);      
                } else if (doublefnuttpos > -1 && (doublefnuttpos < singlefnuttpos || singlefnuttpos == -1) && (doublefnuttpos < spacepos || spacepos == -1)) {
                    endpos = rest.indexOf('"', rest.indexOf('"', startpos) + 1);
                } else if (singlefnuttpos > -1 && (singlefnuttpos < doublefnuttpos || doublefnuttpos == -1) && (singlefnuttpos < spacepos || spacepos == -1)) {
                    endpos = rest.indexOf("'", rest.indexOf("'", startpos) + 1);
                }
                if (!endpos || endpos == -1 || endpos < startpos) {endpos = rest.length;}
                done += rest.substring(0, startpos);
                done += attributeValueHighlight(rest.substring(startpos, endpos + 1));
                rest = rest.substr(endpos + 1);
            }
            return `<span class="special-js">${done}${rest}</span>`;
        }

        function attributeValueHighlight(txt) {
            return `<span class="special-var">${txt}</span>`;
        }

        function commentHighlight(txt) {
            return `<span class="special-comment">${txt}</span>`;
        }

        function cssHighlight(txt) {
            var rest = txt, done = "", s, e, comment, i, midz, sl, c, cc;
            comment = new extract(rest, /\/\*/, "*/", commentHighlight, "MYHIGHLIGHTERCOMMENT");
            rest = comment.rest;
            while (rest.search("{") > -1) {
                s = rest.search("{");
                // my addition for the selector
                let slArr = rest.substring(0, s).trim().split(/(\n|{|}|;)/g);
                sl = slArr[slArr.length - 1]
                slIndex = rest.indexOf(sl, 0)
                // my addition for selector ends
                midz = rest.substr(s + 1);
                cc = 1;
                c = 0;
                for (i = 0; i < midz.length; i++) {
                    if (midz.substr(i, 1) == "{") {cc++; c++}
                    if (midz.substr(i, 1) == "}") {cc--;}
                    if (cc == 0) {break;}
                }
                if (cc != 0) {c = 0;}
                e = s;
                for (i = 0; i <= c; i++) {
                    e = rest.indexOf("}", e + 1);
                }
                if (e == -1) {e = rest.length;}
                // done += rest.substring(0, s + 1);
                done += rest.substring(0, slIndex) + cssSelectorHighlight(rest.substring(slIndex, s)) + rest.substring(s, s + 1);
                done += cssPropertyHighlight(rest.substring(s + 1, e));
                rest = rest.substr(e);
            }
            rest = done + rest;

            rest = rest.replace(/{/g, `<span class="cssdelimitercolor">{</span>`);
            rest = rest.replace(/}/g, `<span class="cssdelimitercolor">}</span>`);
            for (i = 0; i < comment.arr.length; i++) {
                rest = rest.replace("MYHIGHLIGHTERCOMMENT", comment.arr[i]);
            }
            return `<span>${rest}</span>`;
        }

        function cssSelectorHighlight(txt) {
            // extract into array
            let result = txt;
            let arr = result.match(/(\.|#|:)\w+/g) || [];
            if (arr.length < 1) return `<span class="cssselectorcolor" >${result}</span>`
            let rest = result, done = "", start = 0, end;
            for (let i = 0; i < arr.length; i++) {
                let s = arr[i];
                start = rest.indexOf(s);
                end = start + s.length;
                done += rest.substring(0, rest.indexOf(arr[i]));
                let rep = s;
                if (s.startsWith(".")) {
                    rep = `<span class="cssclassnamecolor">${s}</span>`
                } else if (s.startsWith("#")) {
                    rep = `<span class="cssidnamecolor">${s}</span>`
                } else if (s.substring(0, 2) === "::") {
                    rep = `<span class="csspseudoelemcolor">${s}</span>`
                } else if (s.startsWith(":")) {
                    rep = `<span class="csspseudoclasscolor">${s}</span>`
                }
                done += rep
                rest = rest.substr(end)
            }
            rest = done + rest;
            return `<span class="cssselectorcolor" >${rest}</span>`
        }

        function cssPropertyHighlight(txt) {
            var rest = txt, done = "", s, e, n, loop;
            if (rest.indexOf("{") > -1 ) { return cssHighlight(rest); }
            while (rest.search(":") > -1) {
            s = rest.search(":");
            loop = true;
            n = s;
            while (loop == true) {
                loop = false;
                e = rest.indexOf(";", n);
                if (rest.substring(e - 5, e + 1) == "&nbsp;") {
                loop = true;
                n = e + 1;
                }
            }
            if (e == -1) {e = rest.length;}
            done += rest.substring(0, s);
            done += cssPropertyValueHighlight(rest.substring(s, e + 1));
            rest = rest.substr(e + 1);
            }
            return `<span class="csspropertycolor" >${done}${rest}</span>`;
        }

        function cssPropertyValueHighlight(txt) {
            var rest = txt, done = "", s;
            rest = `<span class="cssdelimitercolor">:</span>` + rest.substring(1);
            while (rest.search(/!important/i) > -1) {
                s = rest.search(/!important/i);
                done += rest.substring(0, s);
                done += cssImportantHightlight(rest.substring(s, s + 10));
                rest = rest.substr(s + 10);
            }
            result = done + rest;    
            if (result.substr(result.length - 1, 1) == ";" && result.substr(result.length - 6, 6) != "&nbsp;" && result.substr(result.length - 4, 4) != "&lt;" && result.substr(result.length - 4, 4) != "&gt;" && result.substr(result.length - 5, 5) != "&amp;") {
            result = result.substring(0, result.length - 1) + `<span class="cssproperycharcolor" >;</span>`;
            }
            result = result.replace(/(\d+)(vh|rem|em|px|pc)/g, `<span class="cssunitcolor">$1$2</span>`)
            return `<span class="csspropertyvaluecolor" >${result}</span>`;
        }

        function cssImportantHightlight(txt) {
            return `<span class="cssimportantcolor" >${txt}</span>`;
        }

        function jsHighlight(txt) {
            var rest = txt, done = "", esc = [], i, cc, tt = "", sfnuttpos, dfnuttpos, compos, comlinepos, keywordpos, numpos, mypos, dotpos, y;
            for (i = 0; i < rest.length; i++)  {
                cc = rest.substr(i, 1);
                if (cc == "\\") {
                    esc.push(rest.substr(i, 2));
                    cc = "MYHIGHLIGHTERESCAPE";
                    i++;
                }
                tt += cc;
            }
            rest = tt;
            y = 1;
            while (y == 1) {
                sfnuttpos = getPos(rest, "'", "'", jsStringMode);
                dfnuttpos = getPos(rest, '"', '"', jsStringMode);
                compos = getPos(rest, /\/\*/, "*/", commentHighlight);
                comlinepos = getPos(rest, /\/\//, "\n", commentHighlight);      
                numpos = getNumPos(rest, jsNumberMode);
                keywordpos = getKeywordPos("js", rest, jsKeywordMode);
                dotpos = getDotPos(rest, jsPropertyMode);
                if (Math.max(numpos[0], sfnuttpos[0], dfnuttpos[0], compos[0], comlinepos[0], keywordpos[0], dotpos[0]) == -1) {break;}
                mypos = getMinPos(numpos, sfnuttpos, dfnuttpos, compos, comlinepos, keywordpos, dotpos);
                if (mypos[0] == -1) {break;}
                if (mypos[0] > -1) {
                    done += rest.substring(0, mypos[0]);
                    done += mypos[2](rest.substring(mypos[0], mypos[1]));
                    rest = rest.substr(mypos[1]);
                }
            }
            rest = done + rest;
            for (i = 0; i < esc.length; i++) {
                rest = rest.replace("MYHIGHLIGHTERESCAPE", esc[i]);
            }
            return rest
        }

        function jsStringMode(txt) {
            return `<span class="string">${txt}</span>`;
        }

        function jsKeywordMode(txt) {
            return `<span class="jskeywordcolor">${txt}</span>`;
        }

        function jsNumberMode(txt) {
            return`<span class="num">${txt}</span>`
        }
        
        function jsPropertyMode(txt) {
            return `<span class="jspropertycolor">${txt}</span>`
        }

        function getDotPos(txt, func) {
            var x, i, j, s, e, arr = [".","<", " ", ";", "(", "+", ")", "[", "]", ",", "&", ":", "{", "}", "/" ,"-", "*", "|", "%"];
            s = txt.indexOf(".");
            if (s > -1) {
                x = txt.substr(s + 1);
                for (j = 0; j < x.length; j++) {
                    cc = x[j];
                    for (i = 0; i < arr.length; i++) {
                        if (cc.indexOf(arr[i]) > -1) {
                            e = j;
                            return [s + 1, e + s + 1, func];
                        }
                    }
                }
            }
            return [-1, -1, func];
        }

        function getMinPos() {
            var i, arr = [];
            for (i = 0; i < arguments.length; i++) {
                if (arguments[i][0] > -1) {
                if (arr.length == 0 || arguments[i][0] < arr[0]) {arr = arguments[i];}
                }
            }
            if (arr.length == 0) {arr = arguments[i];}
            return arr;
        }

        function getKeywordPos(typ, txt, func) {
            var words, i, pos, rpos = -1, rpos2 = -1, patt;
            if (typ == "js") {
                words = ["abstract","arguments","boolean","break","byte","case","catch","char","class","const","continue","debugger","default","delete",
                "do","double","else","enum","eval","export","extends","false","final","finally","float","for","function","goto","if","implements","import",
                "in","instanceof","int","interface","let","long","NaN","native","new","null","package","private","protected","public","return","short","static",
                "super","switch","synchronized","this","throw","throws","transient","true","try","typeof","var","void","volatile","while","with","yield"];
            }
            for (i = 0; i < words.length; i++) {
                pos = txt.indexOf(words[i]);
                if (pos > -1) {
                    patt = /\W/g;
                    if (txt.substr(pos + words[i].length,1).match(patt) && txt.substr(pos - 1,1).match(patt)) {
                        if (pos > -1 && (rpos == -1 || pos < rpos)) {
                        rpos = pos;
                        rpos2 = rpos + words[i].length;
                        }
                    }
                } 
            }
            return [rpos, rpos2, func];
        }

        function getPos(txt, start, end, func) {
            var s, e;
            s = txt.search(start);
            e = txt.indexOf(end, s + (end.length));
            if (e == -1) {e = txt.length;}
            return [s, e + (end.length), func];
        }
          
        function getNumPos(txt, func) {
            var arr = ["\n", " ", ";", "(", "+", ")", "[", "]", ",", "&", ":", "{", "}", "/" ,"-", "*", "|", "%", "="], i, j, c, startpos = 0, endpos, word;
            for (i = 0; i < txt.length; i++) {
                for (j = 0; j < arr.length; j++) {
                    c = txt.substr(i, arr[j].length);
                    if (c == arr[j]) {
                        if (c == "-" && (txt.substr(i - 1, 1) == "e" || txt.substr(i - 1, 1) == "E")) {
                        continue;
                        }
                        endpos = i;
                        if (startpos < endpos) {
                        word = txt.substring(startpos, endpos);
                        if (!isNaN(word)) {return [startpos, endpos, func];}
                        }
                        i += arr[j].length;
                        startpos = i;
                        i -= 1;
                        break;
                    }
                }
            }  
            return [-1, -1, func];
        }
    }
)()
