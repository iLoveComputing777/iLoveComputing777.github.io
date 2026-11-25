const pictures = [
  {
    file: "Soggy Cat.jpg",
    name: "Soggy Cat",
    description: "Cats do not like being soaked with water because the water clings to the fur and makes it heavy and uncomfortable",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Cat"
  },
  {
    file: "Silly cat.jpg",
    name: "Silly Cat",
    description: "Always consult your vet if your pet does something that you're not sure what it means.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Cat"
  },
  {
    file: "Goofy Feline.jpg",
    name: "Goofy Feline",
    description: "Cats can show their tongue for a variety of reasons, one of them being comfort or intentionally having it out to show affection.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Cat"
  },
  {
    file: "pukeko bird.jpg",
    name: "Pukeko Bird",
    description: "This is the chick of a bird from New Zealand. The most famous picture of this bird has one of its legs photoshopped out",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Australasian_swamphen"
  },
  {
    file: "hamster.jpg",
    name: "Hamster",
    description: "Hamsters can shove a lot of food into their cheeks to consume it later!.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Hamster"
  },
  {
    file: "duckling.jpg",
    name: "Duckling",
    description: "Most duckling species only take 24 hours to learn how to swim and eat food in the lake after being born.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Duck"
  },
  {
    file: "bulldog.jpg",
    name: "Bulldog",
    description: "There was once a bulldog called Otto, who got a world record by skateboarding between the legs of 30 people.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Bulldog"
  }
];

const image = document.querySelector("#animal-picture");
const name = document.querySelector("#animal-picture-name");
const description = document.querySelector("#animal-picture-description");
const wikipediaLink = document.querySelector("#animal-wikipedia-link");
const nextPictureButton = document.querySelector("#next-animal-picture");

let currentPictureIndex = Math.floor(Math.random() * pictures.length);

function showPicture(picture) {
  image.src = `images/animalPictures/${picture.file}`;
  image.alt = picture.description;
  name.textContent = picture.name;
  description.textContent = picture.description;
  wikipediaLink.href = picture.wikipediaUrl;
}

showPicture(pictures[currentPictureIndex]);

nextPictureButton.addEventListener("click", () => {
  const nextIndex = Math.floor(Math.random() * (pictures.length - 1));
  currentPictureIndex = (currentPictureIndex + nextIndex + 1) % pictures.length;
  showPicture(pictures[currentPictureIndex]);
});
