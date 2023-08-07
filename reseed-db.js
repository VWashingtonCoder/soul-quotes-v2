import { writeFileSync } from "fs";
// This script allows you to randomly reseed the database
// to run it type in  `npm run seed`

const initDB = {
    "users": [
        {
            "id": 1,
            "username": "admin-1",
            "email": "admin1@localhost.com",
            "password": "admin",
            "favorites": []
        },
        {
            "id": 2,
            "username": "testUser3",
            "email": "tu3@ex.co",
            "password": "Password3",
            "favorites": ["funny-10", "philosophy-10", "funny-1", "funny-4", "funny-16"]
        }
    ],
    "quotes": [
        {
            "quoteId": "inspirational-1",
            "quote": "Change will not come if we wait for some other person or some other time. We are the ones we've been waiting for. We are the change that we seek.",
            "author": "Barack Obama",
            "category": "inspirational"
        },
        {
            "quoteId": "inspirational-2",
            "quote": "The cost of liberty is less than the price of repression.",
            "author": "W.E.B. Du Bois",
            "category": "inspirational"
        },
        {
            "quoteId": "inspirational-3",
            "quote": "Hold fast to dreams, for if dreams die, life is a broken-winged bird that cannot fly.",
            "author": "Langston Hughes",
            "category": "inspirational"
        },
        {
            "quoteId": "inspirational-4",
            "quote": "Don't give up, there's no shame in falling down! True shame is to not stand up again!",
            "author": "Naruto (Shippuden)",
            "category": "inspirational"
        },
        {
            "quoteId": "inspirational-5",
            "quote": "Believe in yourself. Not in the you who believes in me. Not the me who believes in you. Believe in the you who believes in yourself.",
            "author": "Kamina (Gurren Lagann)",
            "category": "inspirational"
        },
        {
            "quoteId": "inspirational-6",
            "quote": "It's not always rainbows and butterflies, but compromise that moves us along.",
            "author": "Koro-sensei (Assassination Classroom)",
            "category": "inspirational"
        },
        {
            "quoteId": "inspirational-7",
            "quote": "It doesn't matter if you're weak. If you struggle hard enough, you can make a miracle happen.",
            "author": "Oikawa Tooru (Haikyuu!!)",
            "category": "inspirational"
        },
        {
            "quoteId": "inspirational-8",
            "quote": "Fear is not evil. It tells you what your weakness is. And once you know your weakness, you can become stronger as well as kinder.",
            "author": "Gildarts Clive (Fairy Tail)",
            "category": "inspirational"
        },
        {
            "quoteId": "inspirational-9",
            "quote": "Hard work betrays none, but dreams betray many.",
            "author": "Hachiman Hikigaya (My Teen Romantic Comedy SNAFU)",
            "category": "inspirational"
        },
        {
            "quoteId": "inspirational-10",
            "quote": "When you hit the point of no return, that's the moment it truly becomes a journey.",
            "author": "Kino, Kino's Journey",
            "category": "inspirational"
        },
        {
            "quoteId": "love-1",
            "quote": "Love recognizes no barriers. It jumps hurdles, leaps fences, penetrates walls to arrive at its destination full of hope.",
            "author": "Maya Angelou",
            "category": "love"
        },
        {
            "quoteId": "love-2",
            "quote": "Love is an endless act of forgiveness. Forgiveness is an endless act of love.",
            "author": "Coretta Scott King",
            "category": "love"
        },
        {
            "quoteId": "love-3",
            "quote": "Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day",
            "author": "Steve Harvey",
            "category": "love"
        },
        {
            "quoteId": "love-4",
            "quote": "Love is friendship that has caught fire. It is quiet understanding, mutual confidence, sharing, and forgiving. It is loyalty through good and bad times.",
            "author": "Ann Landers",
            "category": "love"
        },
        {
            "quoteId": "love-5",
            "quote": "I love you not because of who you are, but because of who I am when I am with you.",
            "author": "Roy Mustang (Fullmetal Alchemist)",
            "category": "love"
        },
        {
            "quoteId": "love-6",
            "quote": "Love doesn't need a reason. Pure love will come from the heart without reason and it'll stay every season.",
            "author": "Mamoru Chiba (Sailor Moon)",
            "category": "love"
        },
        {
            "quoteId": "love-7",
            "quote": "The meaning of love is that you can embrace all of someone's imperfections and still see perfection.",
            "author": "Tenma Tsukamoto (School Rumble)",
            "category": "love"
        },
        {
            "quoteId": "love-8",
            "quote": "Love is the most beautiful of all passions, the strongest emotion, and the one that makes us feel most alive.",
            "author": "Hinako Todo, The Anthem of the Heart",
            "category": "love"
        },
        {
            "quoteId": "love-9",
            "quote": "I'll be by your side, supporting you. Even if you, yourself, become your own enemy.",
            "author": "Kikyo (InuYasha)",
            "category": "love"
        },
        {
            "quoteId": "love-10",
            "quote": "I want to be the reason you smile.",
            "author": "Ayuzawa Misaki (Maid Sama!)",
            "category": "love"
        },
        {
            "quoteId": "philosophy-1",
            "quote": "If you want to lift yourself up, lift up someone else.",
            "author": "Booker T. Washington",
            "category": "philosophy"
        },
        {
            "quoteId": "philosophy-2",
            "quote": "I am not what I ought to be, I am not what I want to be, I am not what I hope to be, but still, I am not what I used to be, and by the grace of God, I am what I am.",
            "author": "Frederick Douglass",
            "category": "philosophy"
        },
        {
            "quoteId": "philosophy-3",
            "quote": "We must learn to live together as brothers or perish together as fools.",
            "author": "Martin Luther King Jr.",
            "category": "philosophy"
        },
        {
            "quoteId": "philosophy-4",
            "quote": "We must use time creatively, in the knowledge that the time is always ripe to do right.",
            "author": "Nelson Mandela",
            "category": "philosophy"
        },
        {
            "quoteId": "philosophy-5",
            "quote": "The world is full of empty words. What matters is how you act.",
            "author": "Makishima Shogo (Psycho-Pass)",
            "category": "philosophy"
        },
        {
            "quoteId": "philosophy-6",
            "quote": "In this world, there are things you can only do alone, and things you can only do with somebody else. It's important to combine the two in just the right amount.",
            "author": " Yui Hirasawa (K-On!)",
            "category": "philosophy"
        },
        {
            "quoteId": "philosophy-7",
            "quote": "The things that people believe are categorized into two types: things that should be believed and things that shouldn't be believed. But people aren't able to tell the difference between the two.",
            "author": "Ougi Oshino (Monogatari Series)",
            "category": "philosophy"
        },
        {
            "quoteId": "philosophy-8",
            "quote": "People need a god to give them courage and encouragement. They need to believe in something bigger than themselves. They need a leader to give them guidance.",
            "author": "Satsuki Kiryuin (Kill la Kill)",
            "category": "philosophy"
        },
        {
            "quoteId": "philosophy-9",
            "quote": "I think therefore I am.",
            "author": "René Descartes",
            "category": "philosophy"
        },
        {
            "quoteId": "philosophy-10",
            "quote": "In three words, I can sum up everything I've learned about life: it goes on.",
            "author": "Robert Frost",
            "category": "philosophy"
        },
        {
            "quoteId": "success-1",
            "quote": "Life is not a game of luck. If you want to win, work hard.",
            "author": "Sora (No Game No Life)",
            "category": "success"
        },
        {
            "quoteId": "success-2",
            "quote": "Success is to be measured not so much by the position that one has reached in life as by the obstacles which he has overcome while trying to succeed.",
            "author": "Booker T. Washington",
            "category": "success"
        },
        {
            "quoteId": "success-3",
            "quote": "Success is not the absence of failure; it's the persistence through failure.",
            "author": "Aliko Dangote",
            "category": "success"
        },
        {
            "quoteId": "success-4",
            "quote": "Success is not about how much money you make; it's about the difference you make in people's lives.",
            "author": "Michelle Obama",
            "category": "success"
        },
        {
            "quoteId": "success-5",
            "quote": "If you don't take risks, you can't create a future.",
            "author": "Monkey D. Luffy (One Piece)",
            "category": "success"
        },
        {
            "quoteId": "success-6",
            "quote": "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.",
            "author": "Albert Schweitzer",
            "category": "success"
        },
        {
            "quoteId": "success-7",
            "quote": "Success is not in what you have, but who you are.",
            "author": "Bo Bennett",
            "category": "success"
        },
        {
            "quoteId": "success-8",
            "quote": "Success is not final, failure is not fatal: It is the courage to continue that counts.",
            "author": "Winston Churchill",
            "category": "success"
        },
        {
            "quoteId": "success-9",
            "quote": "The only limit to our realization of tomorrow will be our doubts of today.",
            "author": "Franklin D. Roosevelt",
            "category": "success"
        },
        {
            "quoteId": "success-10",
            "quote": "The future belongs to those who believe in the beauty of their dreams.",
            "author": "Eleanor Roosevelt",
            "category": "success"
        },
        {
            "quoteId": "funny-1",
            "quote": "I'm not addicted to games; I'm committed to them.",
            "author": "Hasegawa Taizou (Gintama)",
            "category": "funny"
        },
        {
            "quoteId": "funny-2",
            "quote": "I'm not crazy. My reality is just different from yours.",
            "author": "Alice (Pandora Hearts)",
            "category": "funny"
        },
        {
            "quoteId": "funny-3",
            "quote": "I don't suffer from insanity. I enjoy every minute of it!",
            "author": "Izaya Orihara (Durarara!!)",
            "category": "funny"
        },
        {
            "quoteId": "funny-4",
            "quote": "I'm not late; I just arrive precisely when I mean to.",
            "author": "Gandalf (Lord Of The Rings)",
            "category": "funny"
        },
        {
            "quoteId": "funny-5",
            "quote": "My advice to you is get married: If you find a good wife you will be happy; if not, you will become a philosopher.",
            "author": "Socrates",
            "category": "funny"
        },
        {
            "quoteId": "funny-6",
            "quote": "People say money is not the key to happiness, but I have always figured if you have enough money, you can have a key made.",
            "author": "Joan Rivers",
            "category": "funny"
        },
        {
            "quoteId": "funny-7",
            "quote": "Do not take life too seriously. You will never get out of it alive.",
            "author": "Elbert Hubbard",
            "category": "funny"
        },
        {
            "quoteId": "funny-8",
            "quote": "The optimist proclaims that we live in the best of all possible worlds, and the pessimist fears this is true.",
            "author": "James Branch Cabell",
            "category": "funny"
        },
        {
            "quoteId": "funny-9",
            "quote": "I love mankind... it's people I can't stand!!",
            "author": "Charles M. Schulz",
            "category": "funny"
        },
        {
            "quoteId": "funny-10",
            "quote": "I think God, in creating man, somewhat overestimated his ability.",
            "author": "Oscar Wilde",
            "category": "funny"
        }
    ]
}

writeFileSync("db.json", JSON.stringify(initDB), { encoding: "utf-8" });