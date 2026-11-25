const pictures = [
  {
    file: "Soggy Cat.jpg",
    description: "Cats do not like being soaked with water because the water clings to the fur and makes it heavy and uncomfortable"
  },
  {
    file: "Silly Cat.jpg",
    description: "Always consult your vet if your pet does something that you're not sure what it means."
  },
  {
    file: "silly cat 2.jpg",
    description: "Cats can show their tongue for a variety of reasons, one of them being comfort or intentionally having it out to show affection."
  },
  {
    file: "Pukeko Bird.jpg",
    description: "This is the chick of a bird from New Zealand. The most famous picture of this bird has one of its leg photoshopped out"
  },
  {
    file: "Hamster.jpg",
    description: "Hamsters can shove a lot of food into their cheeks to consume it later!."
  },
  {
    file: "Duckling.jpg",
    description: "Most duckling species only take 24 hours to learn how to swim and eat food in the lake after being born."
  },
  {
    file: "Bulldog.jpg",
    description: "There was once a bulldog called Otto, who got a world record by skateboarding between the legs of 30 people."
  }
];

const image = document.querySelector("#animal-picture");
const name = document.querySelector("#animal-picture-name");
const description = document.querySelector("#animal-picture-description");
const nextPictureButton = document.querySelector("#next-animal-picture");

let currentPictureIndex = Math.floor(Math.random() * pictures.length);

function showPicture(picture) {
  image.src = `images/animalPictures/${picture.file}`;
  image.alt = picture.description;
  name.textContent = picture.file.replace(/\.[^.]+$/, "");
  description.textContent = picture.description;
}

showPicture(pictures[currentPictureIndex]);

nextPictureButton.addEventListener("click", () => {
  const nextIndex = Math.floor(Math.random() * (pictures.length - 1));
  currentPictureIndex = (currentPictureIndex + nextIndex + 1) % pictures.length;
  showPicture(pictures[currentPictureIndex]);
});
