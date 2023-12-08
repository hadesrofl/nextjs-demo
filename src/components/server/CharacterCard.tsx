import { Character } from "@customTypes/CharacterTypes";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

type CharacterCardProps = {
  href?: string;
} & CharacterCardContentProps;

type CharacterCardContentProps = {
  character: Character;
  attributionText: string;
};

export function CharacterCard(props: CharacterCardProps) {
  const { character, attributionText, href } = props;
  return (
    <Card>
      {href ? (
        <Link href={href}>
          <CharacterCardContent
            character={character}
            attributionText={attributionText}
          />
        </Link>
      ) : (
        <CharacterCardContent
          character={character}
          attributionText={attributionText}
        />
      )}
    </Card>
  );
}

export function CharacterCardContent(props: CharacterCardContentProps) {
  const { character, attributionText } = props;
  return (
    <>
      <CardMedia title={character.name}>
        <Image
          className="rounded-t-lg w-full"
          width={200}
          height={200}
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt=""
        />
      </CardMedia>
      <CardContent>
        <Typography variant="h5" component="div">
          {character.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {character.description}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {attributionText}
        </Typography>
      </CardContent>
    </>
  );
}
