import { delay } from "@helper/delay";
import { randomInt } from "crypto";
import dayjs from "dayjs";

const getMockSeries = async () => {
  await delay(randomInt(10, 20) * 1000);
  const date = dayjs();
  const formerDate = date.subtract(5, "milliseconds");
  return {
    attributionText: "Attribution Text",
    copyright: "Copyright",
    data: {
      limit: 1,
      offset: 0,
      count: 1,
      total: 1,
      results: [
        {
          title: "Secret Empire",
          description:
            "Quem Tiberina descensio festo illo die tanto gaudio affecit, quanto L. Cum sciret confestim esse moriendum eamque mortem ardentiore studio peteret, quam Epicurus voluptatem petendam putat. Equidem etiam Epicurum, in physicis quidem, Democriteum puto. Primum Theophrasti, Strato, physicum se voluit; Bonum incolumis acies: misera caecitas. Quamquam ab iis philosophiam et omnes ingenuas disciplinas habemus; ",
          id: 1,
          thumbnail: {
            path: `https://picsum.photos/seed/${date.unix()}/300`,
            extension: "jpg",
          },
        },
        {
          title: "Civil War",
          description:
            "Indicant pueri, in quibus ut in speculis natura cernitur. Cur ipse Pythagoras et Aegyptum lustravit et Persarum magos adiit? Tollenda est atque extrahenda radicitus. Et ille ridens: Video, inquit, quid agas; ",
          id: 1,
          thumbnail: {
            path: `https://picsum.photos/seed/${date.millisecond()}/300`,
            extension: "jpg",
          },
        },
        {
          title: "War of the Realms",
          description:
            "Multa sunt dicta ab antiquis de contemnendis ac despiciendis rebus humanis; Quodsi ipsam honestatem undique pertectam atque absolutam. Sed quot homines, tot sententiae; Faceres tu quidem, Torquate, haec omnia; ",
          id: 1,
          thumbnail: {
            path: `https://picsum.photos/seed/${formerDate.second()}/300`,
            extension: "jpg",
          },
        },
        {
          title: "Infinity Gauntlet",
          description:
            "Et si turpitudinem fugimus in statu et motu corporis, quid est cur pulchritudinem non sequamur? Est enim effectrix multarum et magnarum voluptatum. Nisi autem rerum natura perspecta erit, nullo modo poterimus sensuum iudicia defendere. Bork Nam his libris eum malo quam reliquo ornatu villae delectari. ",
          id: 1,
          thumbnail: {
            path: `https://picsum.photos/seed/${formerDate.millisecond()}/300`,
            extension: "jpg",
          },
        },
      ],
    },
  };
};

export default getMockSeries;
