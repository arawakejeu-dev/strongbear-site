export type DisciplineKey = "bjj" | "grappling" | "mma";

export const practicalInfo = {
  contact: { email: "strongbearbjj@gmail.com" },
  fightyUrl: process.env.NEXT_PUBLIC_FIGHTY_URL ?? "https://fighty.com/",
  pricing: {
    kids: { label: "Enfants", price: "250 €", period: "par an" },
    adults: { label: "Adultes", price: "350 €", period: "par an", disciplines: ["Jiu-Jitsu Brésilien", "Grappling", "MMA"] },
  },
  locations: {
    jeanMoulin: { name: "Dojo Jean Moulin", city: "Marines" },
    primarySchool: { name: "Dojo de l’École Primaire", city: "Marines" },
    amitie: { name: "Gymnase de l’Amitié", city: "Marines" },
  },
  schedules: {
    bjj: [
      { day: "Lundi", time: "20h30–22h00", discipline: "Jiu-Jitsu Brésilien", location: "jeanMoulin" },
      { day: "Vendredi", time: "19h00–20h00", discipline: "Cours de Jiu-Jitsu Brésilien", location: "amitie" },
      { day: "Vendredi", time: "20h00–21h00", discipline: "Sparring", location: "amitie" },
    ],
    grappling: [
      { day: "Mercredi", time: "19h00–20h00", discipline: "Cours de Grappling", location: "amitie" },
      { day: "Mercredi", time: "20h00–21h00", discipline: "Sparring", location: "amitie" },
    ],
    mma: [
      { day: "Lundi", time: "19h30–20h30", discipline: "MMA Lutte", location: "primarySchool" },
      { day: "Mercredi", time: "20h00–21h00", discipline: "Sparring", location: "amitie" },
      { day: "Mercredi", time: "21h00–22h00", discipline: "MMA Striking", location: "amitie" },
      { day: "Vendredi", time: "21h00–22h00", discipline: "MMA", location: "amitie" },
    ],
  },
  googleReviews: [] as Array<{ name: string; rating: number; text: string; sourceUrl?: string }>,
} as const;

export function getDisciplineSchedule(discipline: DisciplineKey) {
  return practicalInfo.schedules[discipline].map((session) => ({ ...session, venue: practicalInfo.locations[session.location] }));
}

export const globalSchedule = [
  ...getDisciplineSchedule("bjj"),
  ...getDisciplineSchedule("grappling"),
  ...getDisciplineSchedule("mma").filter((session) => !(session.day === "Mercredi" && session.time === "20h00–21h00")),
].map((session) => session.day === "Mercredi" && session.time === "20h00–21h00" ? { ...session, discipline: "Sparring Grappling / MMA" } : session);
