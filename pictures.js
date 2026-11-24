const pictures = [
  {
    file: "soggyCat.jpg",
    description: "Cats do not like being soaked with water because the water clings to the fur and makes it heavy and uncomfortable"
  },
  {
    file: "silly cat1.jpg",
    description: "Always consult your vet if your pet does something that you're not sure what it means."
  },
  {
    file: "silly cat 2.jpg",
    description: "Cats can show their tongue for a variety of reasons, one of them being comfort or intentionally having it out to show affection."
  },
  {
    file: "pukeko bird.jpg",
    description: "This is the chick of a bird from New Zealand. The most famous picture of this bird has one of its leg photoshopped out"
  },
  {
    file: "hamster.jpg",
    description: "Hamsters can shove a lot of food into their cheeks to consume it later!."
  },
  {
    file: "duckling.jpg",
    description: "Most duckling species only take 24 hours to learn how to swim and eat food in the lake after being born."
  },
  {
    file: "bulldog.jpg",
    description: "There was once a bulldog called Otto, who got a world record by skateboarding between the legs of 30 people."
  }
];

const selectedPicture = pictures[Math.floor(Math.random() * pictures.length)];
const image = document.querySelector("#animal-picture");
const name = document.querySelector("#animal-picture-name");
const description = document.querySelector("#animal-picture-description");

image.src = `images/animalPictures/${selectedPicture.file}`;
image.alt = selectedPicture.description;
name.textContent = selectedPicture.file.replace(/\.[^.]+$/, "");
description.textContent = selectedPicture.description;
