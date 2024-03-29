declare module "sentiment" {
  interface SentimentResult {
    score: number;
    comparative: number;
    calculation: Array<{ [word: string]: number }>;
    tokens: string[];
    words: string[];
    positive: string[];
    negative: string[];
  }

  class Sentiment {
    analyze(text: string, options?: any): SentimentResult;
  }

  export = Sentiment;
}
