
import { useParams } from "react-router-dom";
import BibleNavigator from "@/components/bible/BibleNavigator";
import EnhancedBibleReader from "@/components/bible/EnhancedBibleReader";

const BiblePage = () => {
  const { book = "Genesis", chapter = "1" } = useParams();

  return (
    <div className="py-6 space-y-6">
      <BibleNavigator 
        currentBook={book} 
        currentChapter={Number(chapter)} 
      />
      <EnhancedBibleReader 
        book={book} 
        chapter={Number(chapter)} 
      />
    </div>
  );
};

export default BiblePage;
