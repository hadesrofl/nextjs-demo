import { CharacterDataContainer } from "@customTypes/CharacterTypes";
import { delay } from "@helper/delay";
import { randomInt } from "crypto";

const getMockCharacters = async () => {
  await delay(randomInt(1, 5) * 1000);
  return {
    attributionText: `Copright Marvel ${new Date(Date.now()).getFullYear()}`,
    copyright: "Copyright",
    data: createCharactersData(),
  };
};

// based off https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json
function createCharactersData(): CharacterDataContainer {
  const characters = [
    {
      name: "Hulk",
      description: "Nuclear physicist, Agent of S.H.I.E.L.D.",
      id: 332,
      modified: new Date(Date.now()),
      thumbnail: {
        path: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/332-hulk",
        extension: "jpg",
      },
    },
    {
      name: "Iron Man",
      description:
        "Inventor, Industrialist; former United States Secretary of Defense",
      id: 346,
      modified: new Date(Date.now()),
      thumbnail: {
        path: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/346-iron-man",
        extension: "jpg",
      },
    },
    {
      name: "Captain America",
      description:
        "Adventurer, federal official, intelligence operative; former soldier, Hydra agent, liaison between S.H.I.E.L.D. and the Avengers, police officer, teacher, sparring partner.",
      id: 149,
      modified: new Date(Date.now()),
      thumbnail: {
        path: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/149-captain-america",
        extension: "jpg",
      },
    },
    {
      name: "Doctor Strange",
      description: "Sorcerer Supreme, retired neurosurgeon",
      id: 226,
      modified: new Date(Date.now()),
      thumbnail: {
        path: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/226-doctor-strange",
        extension: "jpg",
      },
    },
  ];
  return {
    results: characters,
    total: characters.length,
    count: characters.length,
    offset: 0,
    limit: characters.length,
  };
}

export default getMockCharacters;
