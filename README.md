This simple console program can replace markdown to html.

This thing supports basic things like paragraph, bold, italic, monospaced, preformated, but nesting not allowed

To setup project
1. clone this repo `git clone https://github.com/DimasComp/mtrpz-lab-1.git`
2. enter directory `cd mtrpz-lab-1`
3. install dependencies with `npm i`

To run project
- standard output to console `node index.js convert <file>`

Flags
- `--out <file>` -> allows write to file instead of printing to stdout
- `--format=<type>` -> can be _html_ or _stdout_. Allows to choose output format 

Link to [reverted commit](https://github.com/DimasComp/mtrpz-lab-1/commit/6fc88c1d26483ed0dc81adef576366b8db7e9fb4)

Link to [comit which failed his test](https://github.com/DimasComp/mtrpz-lab-2/commit/a6655065811af3be8ac136cc9f5c6e381baa0589)

Link to [commit which passed his test](https://github.com/DimasComp/mtrpz-lab-2/commit/22e7c8ff07fbc4faaf6488a638b459ef317d2fa1)

Link to [puul request](https://github.com/DimasComp/mtrpz-lab-2/pull/1)

So, testing is important, even when you implement tests in small projects like this just because teacher told you so you somehow manage to find bugs. Main problem is that it is hard to write good tests. And bad tests is even worse than no tests at all. I am not very experienced in writing them so i cannot tell more. In general: writing tests is good, but complicated and time consuming (but if we will do everything in fastest way all our code will be terrible, so...)
