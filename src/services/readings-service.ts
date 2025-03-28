
// A mock service to simulate API calls for daily mass readings

interface Reading {
  title: string;
  citation: string;
  text: string;
}

interface DailyReadingsData {
  date: string;
  liturgicalDay: string;
  liturgicalColor: string;
  readings: Reading[];
}

export const getDailyReadings = async (): Promise<DailyReadingsData> => {
  // In a real app, we would fetch from a liturgical calendar API
  return new Promise((resolve) => {
    setTimeout(() => {
      const today = new Date();
      const formattedDate = today.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      
      // This is mock data that would normally come from an API
      resolve({
        date: formattedDate,
        liturgicalDay: "Sunday in Ordinary Time",
        liturgicalColor: "green",
        readings: [
          {
            title: "First Reading",
            citation: "Isaiah 55:10-11",
            text: "Thus says the LORD: Just as from the heavens the rain and snow come down and do not return there till they have watered the earth, making it fertile and fruitful, giving seed to the one who sows and bread to the one who eats, so shall my word be that goes forth from my mouth; my word shall not return to me void, but shall do my will, achieving the end for which I sent it."
          },
          {
            title: "Responsorial Psalm",
            citation: "Psalm 65:10-14",
            text: "R. The seed that falls on good ground will yield a fruitful harvest.\nYou have visited the land and watered it; greatly have you enriched it. God's watercourses are filled; you have prepared the grain.\nR. The seed that falls on good ground will yield a fruitful harvest."
          },
          {
            title: "Second Reading",
            citation: "Romans 8:18-23",
            text: "Brothers and sisters: I consider that the sufferings of this present time are as nothing compared with the glory to be revealed for us. For creation awaits with eager expectation the revelation of the children of God; for creation was made subject to futility, not of its own accord but because of the one who subjected it, in hope that creation itself would be set free from slavery to corruption and share in the glorious freedom of the children of God. We know that all creation is groaning in labor pains even until now; and not only that, but we ourselves, who have the firstfruits of the Spirit, we also groan within ourselves as we wait for adoption, the redemption of our bodies."
          },
          {
            title: "Gospel",
            citation: "Matthew 13:1-23",
            text: "On that day, Jesus went out of the house and sat down by the sea. Such large crowds gathered around him that he got into a boat and sat down, and the whole crowd stood along the shore. And he spoke to them at length in parables, saying: A sower went out to sow. And as he sowed, some seed fell on the path, and birds came and ate it up. Some fell on rocky ground, where it had little soil. It sprang up at once because the soil was not deep, and when the sun rose it was scorched, and it withered for lack of roots. Some seed fell among thorns, and the thorns grew up and choked it. But some seed fell on rich soil, and produced fruit, a hundred or sixty or thirtyfold. Whoever has ears ought to hear."
          }
        ]
      });
    }, 1000);
  });
};
