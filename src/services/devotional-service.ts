// A service for handling devotionals and scripture context

interface Devotional {
  title: string;
  verse: {
    citation: string;
    text: string;
  };
  reflection: string;
  prayer: string;
  date: string;
}

interface RecommendedPrayer {
  title: string;
  category: string;
  text: string;
  situation: string[];
}

// Prayer recommendations based on different needs
export const recommendedPrayers: RecommendedPrayer[] = [
  {
    title: "Prayer for Strength",
    category: "Daily",
    situation: ["strength", "difficult", "challenge", "struggling", "tired", "weak"],
    text: "Lord, you are my strength and my shield. In times of weakness, lift me up with Your mighty hand. Give me the courage to face the challenges before me, knowing that with You all things are possible. Grant me the perseverance to endure, the wisdom to learn, and the faith to trust in Your perfect plan. Amen."
  },
  {
    title: "Prayer for Guidance",
    category: "Daily",
    situation: ["confused", "direction", "guidance", "decision", "path", "lost", "uncertain"],
    text: "Heavenly Father, I seek Your guidance in my life. Illuminate the path You have chosen for me and give me clarity when I face difficult decisions. Let Your Holy Spirit be my counselor and guide, directing my steps according to Your perfect will. Help me to hear Your voice above all others. Amen."
  },
  {
    title: "Prayer for Healing",
    category: "Health",
    situation: ["sick", "illness", "disease", "healing", "pain", "suffering", "health", "recovery"],
    text: "Divine Healer, I place my health and wellbeing in Your loving hands. Where there is pain, bring comfort; where there is illness, bring healing; where there is despair, bring hope. Strengthen my body, mind, and spirit according to Your holy will. May I be a witness to Your healing power in my life. Amen."
  },
  {
    title: "Prayer for Peace",
    category: "Daily",
    situation: ["anxious", "worried", "fear", "peace", "calm", "stress", "anxiety", "troubled"],
    text: "Prince of Peace, calm the storms that rage within me. Replace my anxiety with Your perfect peace, my fear with faith, and my worry with trust. Help me to rest in the assurance of Your presence and the knowledge that You hold my future. Let Your peace, which surpasses all understanding, guard my heart and mind in Christ Jesus. Amen."
  },
  {
    title: "Prayer for Family",
    category: "Relationships",
    situation: ["family", "relationship", "home", "parents", "children", "spouse", "marriage"],
    text: "Lord of Love, I entrust my family to Your care. Bless our home with Your presence, fill our relationships with Your love, and guide our conversations with Your wisdom. Protect us from harm, heal any divisions among us, and help us to reflect Your love to one another. May our family be a witness to Your faithfulness. Amen."
  }
];

// Daily devotionals
const devotionals: Devotional[] = [
  {
    title: "Finding Peace in God's Presence",
    verse: {
      citation: "Philippians 4:6-7",
      text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus."
    },
    reflection: "Anxiety often comes from focusing on our problems rather than God's presence. Today, practice bringing your concerns directly to God with an attitude of thanksgiving, trusting that His peace will guard your heart and mind.",
    prayer: "Lord, help me to bring my anxieties to You rather than carrying them myself. Replace my worry with Your transcendent peace. Amen.",
    date: "Day 1"
  },
  {
    title: "Strength in Weakness",
    verse: {
      citation: "2 Corinthians 12:9-10",
      text: "But he said to me, 'My grace is sufficient for you, for my power is made perfect in weakness.' Therefore I will boast all the more gladly about my weaknesses, so that Christ's power may rest on me."
    },
    reflection: "Our culture values strength and self-sufficiency, but God works powerfully through our weaknesses. Consider how your challenges might be opportunities for God's grace to be displayed in your life.",
    prayer: "Father, I acknowledge my weakness before You. Work through me not despite my limitations, but because of them. Let Your strength shine through my brokenness. Amen.",
    date: "Day 2"
  },
  {
    title: "Walking in Faith",
    verse: {
      citation: "Hebrews 11:1",
      text: "Now faith is confidence in what we hope for and assurance about what we do not see."
    },
    reflection: "Faith means trusting God when the path forward isn't clear. Like Abraham who left his homeland not knowing where he was going, we're called to follow God one step at a time, trusting His guidance.",
    prayer: "Lord, increase my faith. Help me to walk confidently in the direction You're leading, even when I cannot see the full path ahead. Amen.",
    date: "Day 3"
  },
  {
    title: "God's Unfailing Love",
    verse: {
      citation: "Romans 8:38-39",
      text: "For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers, neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord."
    },
    reflection: "Nothing can separate us from God's love - it's a promise that stands regardless of our circumstances or feelings. Today, rest in the assurance that you are unconditionally loved by your Creator.",
    prayer: "Father, thank You for Your unfailing love that nothing can diminish or take away. Help me to live today from a place of security in Your love. Amen.",
    date: "Day 4"
  },
  {
    title: "Living with Purpose",
    verse: {
      citation: "Ephesians 2:10",
      text: "For we are God's handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do."
    },
    reflection: "You were created with purpose and intention. The good works God has prepared for you might be grand or humble, but they matter eternally. Ask God to reveal how you can serve His purposes today.",
    prayer: "Lord, show me the good works You've prepared for me to do today. Help me to see the opportunities to reflect Your love to others. Amen.",
    date: "Day 5"
  },
  {
    title: "Renewed by God's Word",
    verse: {
      citation: "Psalm 119:105",
      text: "Your word is a lamp for my feet, a light on my path."
    },
    reflection: "Scripture illuminates our path through life's darkness. It provides wisdom for decisions, comfort in sorrow, and truth in confusion. Make time today to let God's Word shine light on your circumstances.",
    prayer: "Holy Spirit, illuminate the Scriptures for me. Help me to understand and apply Your Word to my life, that it might guide my steps and transform my heart. Amen.",
    date: "Day 6"
  },
  {
    title: "The Power of Gratitude",
    verse: {
      citation: "1 Thessalonians 5:16-18",
      text: "Rejoice always, pray continually, give thanks in all circumstances; for this is God's will for you in Christ Jesus."
    },
    reflection: "Gratitude transforms our perspective. Even in difficult times, we can find reasons to thank God. Practice intentional thankfulness today, noticing the gifts God has placed in your life.",
    prayer: "Father, open my eyes to see Your blessings in my life. Cultivate in me a heart of perpetual gratitude that rejoices in Your goodness in all circumstances. Amen.",
    date: "Day 7"
  }
];

// Gets the current day's devotional or a random one if not in range
export const getDailyDevotional = (): Devotional => {
  const date = new Date();
  const dayOfWeek = date.getDay(); // 0-6 (Sunday-Saturday)
  
  // If day is valid index for our devotionals array, return that day's devotional
  if (dayOfWeek >= 0 && dayOfWeek < devotionals.length) {
    return devotionals[dayOfWeek];
  }
  
  // Otherwise return a random devotional
  return devotionals[Math.floor(Math.random() * devotionals.length)];
};

// Find prayers that match a particular need or situation
export const getPrayerRecommendations = (need: string): RecommendedPrayer[] => {
  const normalizedNeed = need.toLowerCase().trim();
  
  return recommendedPrayers.filter(prayer => 
    prayer.situation.some(keyword => 
      normalizedNeed.includes(keyword) || keyword.includes(normalizedNeed)
    )
  );
};

// Get enhanced scripture context
export const getScriptureContext = (citation: string): { context: string, historical: string } | null => {
  // This would ideally connect to a more comprehensive API or database
  // For now, we'll provide context for a few common verses
  const scriptureContext: Record<string, { context: string, historical: string }> = {
    "John 3:16": {
      context: "This verse comes from Jesus' conversation with Nicodemus, a Pharisee who came to Jesus at night. Jesus was explaining the concept of being born again and God's plan of salvation.",
      historical: "The Gospel of John was written around 90-100 AD, after the destruction of Jerusalem. It emphasizes Jesus' divinity and the concept of eternal life through belief in Him."
    },
    "Psalm 23:1": {
      context: "Psalm 23 is attributed to King David, who was a shepherd before becoming king. The psalm uses shepherd imagery to describe God's care and protection.",
      historical: "David composed many psalms during his life, which spanned approximately 1040-970 BC. As both a shepherd and king, he experienced God's guidance in various circumstances."
    },
    "Romans 8:28": {
      context: "This verse is part of Paul's discussion about life in the Spirit and God's ultimate plan of redemption. It comes after Paul writes about suffering and groaning in this present age.",
      historical: "Paul wrote his letter to the Romans around 57 AD while in Corinth, addressing a church he had not yet visited. He systematically explained the gospel and its implications."
    },
    "Philippians 4:13": {
      context: "This verse appears as Paul is thanking the Philippians for their gifts. He explains that he has learned to be content in all circumstances, whether in plenty or in need.",
      historical: "Paul wrote to the Philippians while imprisoned, likely in Rome around 61-62 AD. Despite his circumstances, the letter is filled with joy and encouragement."
    },
  };
  
  // Find the exact match or a partial match
  const exact = scriptureContext[citation];
  if (exact) return exact;
  
  // Try to find a partial match if no exact match is found
  const key = Object.keys(scriptureContext).find(k => 
    citation.includes(k) || k.includes(citation)
  );
  
  return key ? scriptureContext[key] : null;
};
