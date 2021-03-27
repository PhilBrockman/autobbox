# Annotating images with React

Using point and click actions to capture objects inside of their bounding boxes bothered my hand. Using a trackpad, I could "point" with ease but "click"ing started to literally hurt.

A labeled dataset of 7 segment digits ain't worth all that.

To continue to make progress, I developed a hacky clone of Roboflow's annotation. The clone's biggest upside is that I could label bother-free. The motion of clicking, holding, and ALSO dragging was too much. I replace this motion with a key tap, mouse move, key tap which I found I could sustain pain-free. (I change class by mouseovering the box and pressing 0-9.)

Key Shortcuts:
* enter: next image
* shift: previous image
* \\: deletes bounding box that is moused over
* n: start (first time) or stop (second time) drawing a bounding box

Other Key shortcuts:
* view settings box beneath the labeling area

Note:
The image data is written to LocalStorage to help data persist between refreshes. My hack to switch to a new json file is to use "localStorage.clear()" in the console window. All of this hassle could have been avoided had the developer not dogheadedly pursued JSON as the universal data language.
