import { v4 as uuid } from "uuid";

export const types = {
  CARD_LIST: "cardList",
  CARD: "card",
  HOMEPAGE: "homepage",
};

export const itemHash = {};

export const homePage = makeHomepage();

function makeHomepage(title = "Project Homepage Test") {
  return makeItem({
    type: types.HOMEPAGE,
    title,
    orderedChildren: [0, 0].map(() => makeCardList().id),
  });
}

function makeCardList(title = getHeader()) {
  return makeItem({
    type: types.CARD_LIST,
    title,
    orderedChildren: [0, 0, 0].map(() => makeCard().id),
    isDroppable: true,
  });
}

function makeCard(content = getContent()) {
  return makeItem({ type: types.CARD, content });
}

function makeItem(options) {
  const item = { id: uuid(), ...options };
  itemHash[item.id] = item;

  return item;
}

function getContent() {
  const jokes = [
    "I used to work for a soft drink can crusher. It was soda pressing.",
    "I just read a book about Stockholm syndrome. It was pretty bad at first, but by the end I liked it.",
    "Did you hear about the cheese who saved the world? It was Legend-dairy!",
    "Why do bananas have to put on sunscreen before they go to the beach? Because they might peel!",
    "How do robots eat guacamole? With computer chips.",
    "What do Alexander the Great and Winnie the Pooh have in common? Same middle name.",
    "What did one plate say to the other plate? Dinner is on me!",
    "Why do pirates not know the alphabet? They always get stuck at 'C'.",
    "Who did the wizard marry? His ghoul-friend",
    "Just read a few facts about frogs. They were ribbiting.",
    "Do you know where you can get chicken broth in bulk? The stock market.",
  ];

  return jokes[randNumber(jokes.length)];
}

function getHeader() {
  const headers = [
    "Local Man Wins Aubergine Growing Contest For the Third Time",
    "Woman With Butterfly Tattoo Arrested for 37th Time",
    "Viral Photo of Lizard Had Been Photoshopped",
    "Small Tornado Forcast in Northern Regions",
  ];

  return headers[randNumber(headers.length)];
}

function randNumber(max) {
  return Math.floor(Math.random() * max);
}
