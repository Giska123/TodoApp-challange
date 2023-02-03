# Frontend Mentor - Todo app solution

This is a solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)


## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- **Bonus**: Drag and drop to reorder items on the list

### Screenshot

![Light Mode](./screenshot/lightMode.png)
![Dark Mode](./screenshot/darkMode.png)


### Links

- Solution URL: [Github](https://github.com/Giska123/TodoApp-challange)
- Live Site URL: [Vercel](https://todo-app-challange.vercel.app/)

## My process

### Built with

- [React](https://reactjs.org/) - JS library
- [Express](https://expressjs.com/) - Open-source Node.js web application framework


### What I learned

```css
.checkbox-circle input[type="checkbox"]:checked + .checkmark:after {
    display: block;
}
```
```js
for (const span of spans) {
      span.addEventListener("click", function() {
          for (const otherSpan of spans) {
              otherSpan.classList.remove("active");
          }
          this.classList.add("active");
      });
  }
```


### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect.

### Useful resources

- [Example resource 1](https://www.example.com) - This helped me for XYZ reason. I really liked this pattern and will use it going forward.


## Author

- Website - [https://giska-portfolio.netlify.app/)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)


## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit.

