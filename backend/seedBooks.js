import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Book from './models/Book.js';

dotenv.config();

const booksWithImages = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    totalCopies: 5,
    availableCopies: 5,
    imageUrl: "https://covers.openlibrary.org/b/id/8231990-L.jpg",
    description: "The story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.",
    genre: "Classic Fiction",
    publishedYear: 1925
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    totalCopies: 4,
    availableCopies: 4,
    imageUrl: "https://covers.openlibrary.org/b/id/8225260-L.jpg",
    description: "The story of racial injustice and the loss of innocence in the American South.",
    genre: "Classic Fiction",
    publishedYear: 1960
  },
  {
    title: "1984",
    author: "George Orwell",
    totalCopies: 6,
    availableCopies: 6,
    imageUrl: "https://covers.openlibrary.org/b/id/8225270-L.jpg",
    description: "A dystopian social science fiction novel about totalitarianism and surveillance.",
    genre: "Dystopian",
    publishedYear: 1949
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    totalCopies: 4,
    availableCopies: 4,
    imageUrl: "https://covers.openlibrary.org/b/id/8225280-L.jpg",
    description: "A romantic novel of manners focusing on the Bennet family.",
    genre: "Romance",
    publishedYear: 1813
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    totalCopies: 3,
    availableCopies: 3,
    imageUrl: "https://covers.openlibrary.org/b/id/8231970-L.jpg",
    description: "Story of teenage rebellion and alienation.",
    genre: "Coming-of-age",
    publishedYear: 1951
  },
  {
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    totalCopies: 10,
    availableCopies: 10,
    imageUrl: "https://covers.openlibrary.org/b/id/8225290-L.jpg",
    description: "A young wizard discovers his magical heritage.",
    genre: "Fantasy",
    publishedYear: 1997
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    totalCopies: 5,
    availableCopies: 5,
    imageUrl: "https://covers.openlibrary.org/b/id/8225300-L.jpg",
    description: "A hobbit's adventurous journey to reclaim treasure.",
    genre: "Fantasy",
    publishedYear: 1937
  },
  {
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    totalCopies: 3,
    availableCopies: 3,
    imageUrl: "https://covers.openlibrary.org/b/id/8232000-L.jpg",
    description: "A future society where books are banned and burned.",
    genre: "Dystopian",
    publishedYear: 1953
  },
  {
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    totalCopies: 4,
    availableCopies: 4,
    imageUrl: "https://covers.openlibrary.org/b/id/8225310-L.jpg",
    description: "An orphan's journey to love and independence.",
    genre: "Gothic Romance",
    publishedYear: 1847
  },
  {
    title: "Animal Farm",
    author: "George Orwell",
    totalCopies: 5,
    availableCopies: 5,
    imageUrl: "https://covers.openlibrary.org/b/id/8232010-L.jpg",
    description: "An allegorical novella about the Russian Revolution.",
    genre: "Political Satire",
    publishedYear: 1945
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    totalCopies: 3,
    availableCopies: 3,
    imageUrl: "https://covers.openlibrary.org/b/id/8225320-L.jpg",
    description: "A dystopian novel about a technologically advanced future.",
    genre: "Dystopian",
    publishedYear: 1932
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    totalCopies: 8,
    availableCopies: 8,
    imageUrl: "https://covers.openlibrary.org/b/id/8225330-L.jpg",
    description: "The quest to destroy the One Ring.",
    genre: "High Fantasy",
    publishedYear: 1954
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    totalCopies: 7,
    availableCopies: 7,
    imageUrl: "https://covers.openlibrary.org/b/id/8232020-L.jpg",
    description: "A shepherd's journey to find his personal legend.",
    genre: "Philosophical Fiction",
    publishedYear: 1988
  },
  {
    title: "The Da Vinci Code",
    author: "Dan Brown",
    totalCopies: 6,
    availableCopies: 6,
    imageUrl: "https://covers.openlibrary.org/b/id/8225340-L.jpg",
    description: "A mysterious murder in the Louvre leads to a religious secret.",
    genre: "Mystery Thriller",
    publishedYear: 2003
  },
  {
    title: "The Hunger Games",
    author: "Suzanne Collins",
    totalCopies: 8,
    availableCopies: 8,
    imageUrl: "https://covers.openlibrary.org/b/id/8225350-L.jpg",
    description: "Teenagers fight to the death in a dystopian arena.",
    genre: "Young Adult Dystopian",
    publishedYear: 2008
  },
  {
    title: "Moby Dick",
    author: "Herman Melville",
    totalCopies: 3,
    availableCopies: 3,
    imageUrl: "https://covers.openlibrary.org/b/id/8232030-L.jpg",
    description: "Captain Ahab's obsessive quest for the white whale.",
    genre: "Adventure",
    publishedYear: 1851
  },
  {
    title: "War and Peace",
    author: "Leo Tolstoy",
    totalCopies: 2,
    availableCopies: 2,
    imageUrl: "https://covers.openlibrary.org/b/id/8225360-L.jpg",
    description: "The story of Russian society during the Napoleonic era.",
    genre: "Historical Fiction",
    publishedYear: 1869
  },
  {
    title: "The Odyssey",
    author: "Homer",
    totalCopies: 4,
    availableCopies: 4,
    imageUrl: "https://covers.openlibrary.org/b/id/8232040-L.jpg",
    description: "The epic journey of Odysseus returning home from Troy.",
    genre: "Epic Poetry",
    publishedYear: -800
  },
  {
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    totalCopies: 3,
    availableCopies: 3,
    imageUrl: "https://covers.openlibrary.org/b/id/8225370-L.jpg",
    description: "The mental anguish of a murderer in St. Petersburg.",
    genre: "Psychological Fiction",
    publishedYear: 1866
  },
  {
    title: "The Book Thief",
    author: "Markus Zusak",
    totalCopies: 5,
    availableCopies: 5,
    imageUrl: "https://covers.openlibrary.org/b/id/8232050-L.jpg",
    description: "A young girl's love of books during Nazi Germany.",
    genre: "Historical Fiction",
    publishedYear: 2005
  },
  {
    title: "The Kite Runner",
    author: "Khaled Hosseini",
    totalCopies: 6,
    availableCopies: 6,
    imageUrl: "https://covers.openlibrary.org/b/id/8225380-L.jpg",
    description: "A story of friendship, betrayal, and redemption in Afghanistan.",
    genre: "Historical Fiction",
    publishedYear: 2003
  },
  {
    title: "Life of Pi",
    author: "Yann Martel",
    totalCopies: 4,
    availableCopies: 4,
    imageUrl: "https://covers.openlibrary.org/b/id/8232060-L.jpg",
    description: "A boy stranded on a lifeboat with a tiger.",
    genre: "Adventure",
    publishedYear: 2001
  },
  {
    title: "The Girl with the Dragon Tattoo",
    author: "Stieg Larsson",
    totalCopies: 5,
    availableCopies: 5,
    imageUrl: "https://covers.openlibrary.org/b/id/8225390-L.jpg",
    description: "A journalist and hacker investigate a decades-old disappearance.",
    genre: "Crime Thriller",
    publishedYear: 2005
  },
  {
    title: "Gone with the Wind",
    author: "Margaret Mitchell",
    totalCopies: 4,
    availableCopies: 4,
    imageUrl: "https://covers.openlibrary.org/b/id/8232070-L.jpg",
    description: "A story of love and survival during the Civil War.",
    genre: "Historical Romance",
    publishedYear: 1936
  },
  {
    title: "The Shining",
    author: "Stephen King",
    totalCopies: 5,
    availableCopies: 5,
    imageUrl: "https://covers.openlibrary.org/b/id/8225400-L.jpg",
    description: "A family's winter at an isolated haunted hotel.",
    genre: "Horror",
    publishedYear: 1977
  },
  {
    title: "The Chronicles of Narnia",
    author: "C.S. Lewis",
    totalCopies: 7,
    availableCopies: 7,
    imageUrl: "https://covers.openlibrary.org/b/id/8232080-L.jpg",
    description: "Children discover a magical land through a wardrobe.",
    genre: "Fantasy",
    publishedYear: 1950
  },
  {
    title: "Little Women",
    author: "Louisa May Alcott",
    totalCopies: 5,
    availableCopies: 5,
    imageUrl: "https://covers.openlibrary.org/b/id/8225410-L.jpg",
    description: "The lives of the four March sisters during the Civil War.",
    genre: "Classic Fiction",
    publishedYear: 1868
  },
  {
    title: "The Picture of Dorian Gray",
    author: "Oscar Wilde",
    totalCopies: 3,
    availableCopies: 3,
    imageUrl: "https://covers.openlibrary.org/b/id/8232090-L.jpg",
    description: "A man's portrait ages while he remains young and corrupt.",
    genre: "Philosophical Fiction",
    publishedYear: 1890
  },
  {
    title: "Wuthering Heights",
    author: "Emily Brontë",
    totalCopies: 4,
    availableCopies: 4,
    imageUrl: "https://covers.openlibrary.org/b/id/8225420-L.jpg",
    description: "A tale of passionate love and revenge on the Yorkshire moors.",
    genre: "Gothic Romance",
    publishedYear: 1847
  },
  {
    title: "The Adventures of Huckleberry Finn",
    author: "Mark Twain",
    totalCopies: 5,
    availableCopies: 5,
    imageUrl: "https://covers.openlibrary.org/b/id/8232100-L.jpg",
    description: "A boy's journey down the Mississippi River with an escaped slave.",
    genre: "Adventure",
    publishedYear: 1884
  },
  {
    title: "Anna Karenina",
    author: "Leo Tolstoy",
    totalCopies: 3,
    availableCopies: 3,
    imageUrl: "https://covers.openlibrary.org/b/id/8225430-L.jpg",
    description: "The tragic love affair of a married aristocrat.",
    genre: "Literary Fiction",
    publishedYear: 1877
  },
  {
    title: "The Secret Garden",
    author: "Frances Hodgson Burnett",
    totalCopies: 6,
    availableCopies: 6,
    imageUrl: "https://covers.openlibrary.org/b/id/8232110-L.jpg",
    description: "A hidden garden transforms the lives of two lonely children.",
    genre: "Children's Literature",
    publishedYear: 1911
  },
  {
    title: "Dracula",
    author: "Bram Stoker",
    totalCopies: 4,
    availableCopies: 4,
    imageUrl: "https://covers.openlibrary.org/b/id/8225440-L.jpg",
    description: "The legendary vampire's attempt to move to England.",
    genre: "Gothic Horror",
    publishedYear: 1897
  },
  {
    title: "Frankenstein",
    author: "Mary Shelley",
    totalCopies: 5,
    availableCopies: 5,
    imageUrl: "https://covers.openlibrary.org/b/id/8232120-L.jpg",
    description: "A scientist creates a living being that becomes a monster.",
    genre: "Gothic Science Fiction",
    publishedYear: 1818
  },
  {
    title: "The Scarlet Letter",
    author: "Nathaniel Hawthorne",
    totalCopies: 4,
    availableCopies: 4,
    imageUrl: "https://covers.openlibrary.org/b/id/8225450-L.jpg",
    description: "A woman's public shaming for adultery in Puritan Boston.",
    genre: "Historical Fiction",
    publishedYear: 1850
  },
  {
    title: "A Tale of Two Cities",
    author: "Charles Dickens",
    totalCopies: 5,
    availableCopies: 5,
    imageUrl: "https://covers.openlibrary.org/b/id/8232130-L.jpg",
    description: "The story of the French Revolution in London and Paris.",
    genre: "Historical Fiction",
    publishedYear: 1859
  },
  {
    title: "The Jungle Book",
    author: "Rudyard Kipling",
    totalCopies: 6,
    availableCopies: 6,
    imageUrl: "https://covers.openlibrary.org/b/id/8225460-L.jpg",
    description: "The adventures of Mowgli in the Indian jungle.",
    genre: "Children's Literature",
    publishedYear: 1894
  },
  {
    title: "Alice's Adventures in Wonderland",
    author: "Lewis Carroll",
    totalCopies: 7,
    availableCopies: 7,
    imageUrl: "https://covers.openlibrary.org/b/id/8232140-L.jpg",
    description: "A girl falls down a rabbit hole into a fantasy world.",
    genre: "Fantasy",
    publishedYear: 1865
  },
  {
    title: "The Hound of the Baskervilles",
    author: "Arthur Conan Doyle",
    totalCopies: 4,
    availableCopies: 4,
    imageUrl: "https://covers.openlibrary.org/b/id/8225470-L.jpg",
    description: "Sherlock Holmes investigates a legendary phantom hound.",
    genre: "Mystery",
    publishedYear: 1902
  },
  {
    title: "The Call of the Wild",
    author: "Jack London",
    totalCopies: 5,
    availableCopies: 5,
    imageUrl: "https://covers.openlibrary.org/b/id/8232150-L.jpg",
    description: "A dog's transformation into a wild wolf-dog in Alaska.",
    genre: "Adventure",
    publishedYear: 1903
  },
  {
    title: "The Three Musketeers",
    author: "Alexandre Dumas",
    totalCopies: 5,
    availableCopies: 5,
    imageUrl: "https://covers.openlibrary.org/b/id/8225480-L.jpg",
    description: "A young man's adventures with the king's musketeers.",
    genre: "Adventure",
    publishedYear: 1844
  },
  {
    title: "The Count of Monte Cristo",
    author: "Alexandre Dumas",
    totalCopies: 4,
    availableCopies: 4,
    imageUrl: "https://covers.openlibrary.org/b/id/8232160-L.jpg",
    description: "A man's epic quest for revenge after wrongful imprisonment.",
    genre: "Adventure",
    publishedYear: 1844
  },
  {
    title: "The Godfather",
    author: "Mario Puzo",
    totalCopies: 5,
    availableCopies: 5,
    imageUrl: "https://covers.openlibrary.org/b/id/8225490-L.jpg",
    description: "The story of a powerful Italian-American crime family.",
    genre: "Crime Fiction",
    publishedYear: 1969
  },
  {
    title: "The Martian",
    author: "Andy Weir",
    totalCopies: 6,
    availableCopies: 6,
    imageUrl: "https://covers.openlibrary.org/b/id/8232170-L.jpg",
    description: "An astronaut's struggle to survive alone on Mars.",
    genre: "Science Fiction",
    publishedYear: 2011
  },
  {
    title: "Gone Girl",
    author: "Gillian Flynn",
    totalCopies: 5,
    availableCopies: 5,
    imageUrl: "https://covers.openlibrary.org/b/id/8225500-L.jpg",
    description: "A wife's disappearance reveals dark secrets in a marriage.",
    genre: "Psychological Thriller",
    publishedYear: 2012
  },
  {
    title: "The Fault in Our Stars",
    author: "John Green",
    totalCopies: 7,
    availableCopies: 7,
    imageUrl: "https://covers.openlibrary.org/b/id/8232180-L.jpg",
    description: "Two teenagers with cancer fall in love.",
    genre: "Young Adult Romance",
    publishedYear: 2012
  },
  {
    title: "The Help",
    author: "Kathryn Stockett",
    totalCopies: 6,
    availableCopies: 6,
    imageUrl: "https://covers.openlibrary.org/b/id/8225510-L.jpg",
    description: "Black maids share their stories in 1960s Mississippi.",
    genre: "Historical Fiction",
    publishedYear: 2009
  },
  {
    title: "The Road",
    author: "Cormac McCarthy",
    totalCopies: 4,
    availableCopies: 4,
    imageUrl: "https://covers.openlibrary.org/b/id/8232190-L.jpg",
    description: "A father and son's journey through a post-apocalyptic world.",
    genre: "Post-Apocalyptic",
    publishedYear: 2006
  },
  {
    title: "The Lovely Bones",
    author: "Alice Sebold",
    totalCopies: 5,
    availableCopies: 5,
    imageUrl: "https://covers.openlibrary.org/b/id/8225520-L.jpg",
    description: "A murdered girl watches her family from heaven.",
    genre: "Literary Fiction",
    publishedYear: 2002
  },
  {
    title: "Memoirs of a Geisha",
    author: "Arthur Golden",
    totalCopies: 5,
    availableCopies: 5,
    imageUrl: "https://covers.openlibrary.org/b/id/8232200-L.jpg",
    description: "The life of a geisha in pre-World War II Japan.",
    genre: "Historical Fiction",
    publishedYear: 1997
  }
];

const seedBooks = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Clear existing books (remove this line if you want to keep existing)
    await Book.deleteMany({});
    console.log('📚 Cleared existing books');
    
    // Insert new books
    const result = await Book.insertMany(booksWithImages);
    console.log(`✅ Added ${result.length} books with images successfully!`);
    
    // Display sample of added books
    console.log('\n📖 Sample of added books:');
    result.slice(0, 5).forEach(book => {
      console.log(`   - ${book.title} by ${book.author}`);
    });
    
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding books:', error);
    process.exit(1);
  }
};

seedBooks();