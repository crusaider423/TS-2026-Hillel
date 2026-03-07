/** У вас є дві сутності - список фільмів і список категорій фільмів.
Кожен фільм містить поля: назва, рік випуску, рейтинг, список нагород.

Категорія містить поля: назва і фільми.

У кожного списку є пошук за ім'ям (це, по суті, фільтрація), у списку фільмів є додаткова фільтрація за роком випуску, рейтингом і нагородами.

У нас визначено три типи фільтрів:

Фільтр відповідності має поле filter
Фільтр діапазону має поле filter і filterTo
Фільтр пошуку за значеннями має поле values

Кожен список містить стан його фільтрів, який може бути змінений тільки методом applySearchValue або applyFiltersValue (за наявності додаткових фільтрів)

Вам необхідно подумати про поділ вашого коду на різні сутності, інтерфеси і типи, щоб зробити ваше рішення типобезпечним. Реалізація всіх методів не є необхідною - це за бажанням. */

interface Film {
  name: string;
  year: number;
  rate: number;
  awards: string[];
}

interface Category {
  name: string;
  films: Film[];
}

type MatchFilter = { type: "match"; filter: string };
type RangeFilter = { type: "range"; filter: number; filterTo: number };
type ValuesFilter = { type: "values"; values: string[] };

interface FilmFiltersState {
  name: MatchFilter;
  year: RangeFilter;
  rate: RangeFilter;
  awards: ValuesFilter;
}

interface CategoryFiltersState {
  name: MatchFilter;
}

interface FilmList {
  films: Film[];
  filtersState: FilmFiltersState;
  applySearchValue(value: string): void;
  applyFiltersValue(filters: Partial<FilmFiltersState>): void;
}

interface CategoryList {
  categories: Category[];
  filtersState: CategoryFiltersState;
  applySearchValue(filter: MatchFilter): void;
}
