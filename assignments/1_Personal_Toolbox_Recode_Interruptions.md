# Personal Toolbox - Recode _Interruptions_

In this series of assignments, you will be building your own library for drawing with SVG. This first assignment focuses on implementing software components for drawing primitive shapes and basic lines.

Your goal in this assignment is to write a program that generates an SVG file. This file should (to some reasonable degree) replicate [_Interruptions_ (1968-1969)](https://dam.org/museum/artists_ui/artists/molnar-vera/interruptions/) by Vera Molnár.

To do this, you will need to implement reusable program components that can represent each of these SVG primitives:
- Circles
- Ellipses
- Rectangles
- Polygons
- Lines

Use these primitive components to draw _Interruptions_ as an SVG file. Then, notice that _Interruptions_ is just a bunch of lines; use your line component to replicate the original, then use your other conponents to create one or more variations on the original. 

## Learning Goals
- Understand the structure and syntax of SVG files
- Practice writing reusable code components
- Begin work on your own library, which you'll use in Project 1.

## Deliverables
- An SVG file that replicates _Interruptions_.
- One or more SVG files that are variations on _Interruptions_.
- The program that generated the SVG files, containing your primitive components.
    - For each primitive component, it should be possible to specify attributes such as position, size, color, radius, etc.
    - These components should be located together, and be reasonably self-contained and portable.
    - You should not have copy-pasted your program for each variation; there should be (more or less) one program that generates all of the SVG files.
- A README.md file that briefly explains how to run your program, where to find your primitive components, and any important design decisions you made.

> _All of the above should be committed to a GitHub repository; submit the URL of this repository._

## Grading Criteria

> _So long as you attend the critique, work may be redone and resubmitted for a higher grade._

<table>
    <tr>
        <td>A</td>
        <td>
            <li>Your recreation of <em>Interruptions</em> is accurate and thoughtfully done.</li>
            <li>Your variations on <em>Interruptions</em> are interesting and demonstrate creative risk-taking.</li>
            <li>Your primitive components do their job and are used to create the artwork.</li>
            <li>Your readme is clear and sufficient.</li>
        </td>
    </tr>
    <tr>
        <td>B</td>
        <td><li>One of the required components is missing.</li></td>
    </tr>
    <tr>
        <td>C</td>
        <td><li>You did not participate in critique, or the work does not reflect your capacity.</li></td>
    </tr>
    <tr>
        <td>D</td>
        <td></td>
    </tr>
    <tr>
        <td>F</td>
        <td><li>Multiple components are missing entirely, the work is incomplete, or the work is clearly phoned in (well below your capacity).</li></td>
    </tr>

</table>

