
// A mock service to simulate API calls for Bible content

interface Verse {
  number: number;
  text: string;
}

// This is a mock service that would normally fetch from an API
export const getVerseText = async (
  book: string,
  chapter: number
): Promise<Verse[]> => {
  // In a real app, we would fetch from a Bible API here
  return new Promise((resolve) => {
    setTimeout(() => {
      if (book === "Genesis" && chapter === 1) {
        resolve([
          { number: 1, text: "In the beginning God created the heavens and the earth." },
          { number: 2, text: "Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters." },
          { number: 3, text: "And God said, \"Let there be light,\" and there was light." },
          { number: 4, text: "God saw that the light was good, and he separated the light from the darkness." },
          { number: 5, text: "God called the light \"day,\" and the darkness he called \"night.\" And there was evening, and there was morning—the first day." },
          { number: 6, text: "And God said, \"Let there be a vault between the waters to separate water from water.\"" },
          { number: 7, text: "So God made the vault and separated the water under the vault from the water above it. And it was so." },
          { number: 8, text: "God called the vault \"sky.\" And there was evening, and there was morning—the second day." },
          { number: 9, text: "And God said, \"Let the water under the sky be gathered to one place, and let dry ground appear.\" And it was so." },
          { number: 10, text: "God called the dry ground \"land,\" and the gathered waters he called \"seas.\" And God saw that it was good." },
        ]);
      } else if (book === "John" && chapter === 1) {
        resolve([
          { number: 1, text: "In the beginning was the Word, and the Word was with God, and the Word was God." },
          { number: 2, text: "He was with God in the beginning." },
          { number: 3, text: "Through him all things were made; without him nothing was made that has been made." },
          { number: 4, text: "In him was life, and that life was the light of all mankind." },
          { number: 5, text: "The light shines in the darkness, and the darkness has not overcome it." },
          { number: 6, text: "There was a man sent from God whose name was John." },
          { number: 7, text: "He came as a witness to testify concerning that light, so that through him all might believe." },
          { number: 8, text: "He himself was not the light; he came only as a witness to the light." },
          { number: 9, text: "The true light that gives light to everyone was coming into the world." },
          { number: 10, text: "He was in the world, and though the world was made through him, the world did not recognize him." },
        ]);
      } else if (book === "Matthew" && chapter === 5) {
        resolve([
          { number: 1, text: "Now when Jesus saw the crowds, he went up on a mountainside and sat down. His disciples came to him," },
          { number: 2, text: "and he began to teach them. He said:" },
          { number: 3, text: "\"Blessed are the poor in spirit, for theirs is the kingdom of heaven." },
          { number: 4, text: "Blessed are those who mourn, for they will be comforted." },
          { number: 5, text: "Blessed are the meek, for they will inherit the earth." },
          { number: 6, text: "Blessed are those who hunger and thirst for righteousness, for they will be filled." },
          { number: 7, text: "Blessed are the merciful, for they will be shown mercy." },
          { number: 8, text: "Blessed are the pure in heart, for they will see God." },
          { number: 9, text: "Blessed are the peacemakers, for they will be called children of God." },
          { number: 10, text: "Blessed are those who are persecuted because of righteousness, for theirs is the kingdom of heaven.\"" },
        ]);
      } else {
        // Default mock verses for any other book/chapter
        const verses = [];
        for (let i = 1; i <= 10; i++) {
          verses.push({
            number: i,
            text: `This is a placeholder for ${book} chapter ${chapter}, verse ${i}. In a complete app, this would contain the actual biblical text.`,
          });
        }
        resolve(verses);
      }
    }, 800); // Simulate network delay
  });
};

export const searchBible = async (
  query: string,
  filter?: { book?: string; testament?: "old" | "new" }
): Promise<{ citation: string; text: string }[]> => {
  // In a real app, we would search the Bible API here
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock search results
      resolve([
        { citation: "John 3:16", text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." },
        { citation: "Romans 5:8", text: "But God demonstrates his own love for us in this: While we were still sinners, Christ died for us." },
        { citation: "1 John 4:7-8", text: "Dear friends, let us love one another, for love comes from God. Everyone who loves has been born of God and knows God. Whoever does not love does not know God, because God is love." },
      ]);
    }, 1000);
  });
};
