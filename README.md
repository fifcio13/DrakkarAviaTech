# electron-app

An Electron Drakkar application with React

# Dokumentacja Aplikacji Front-End

## Technologie

Aplikacja front-end została zbudowana w technologii JavaScript z użyciem frameworka React. Wybór tej technologii był podyktowany następującymi czynnikami:
Łatwość tworzenia aplikacji standalone z pomocą Electron: Ze względu na oszczędność RAM na Raspberry Pi oraz ograniczenia techniczne wynikające z niskiej wersji sprzętu.
Bezproblemowa integracja z Mapami Google: Łatwość dodawania zaplanowanych funkcjonalności.
Szybkość pisania aplikacji w React: Ułatwia szybki rozwój.
Uproszczone połączenia z bazą danych (MySQL): Łatwiejsze zarządzanie danymi.
Oprócz standardowych bibliotek React i Electron, korzystamy również z biblioteki @vis.gl/react-google-maps, która umożliwia szybszą i bardziej przystępną edycję komponentów map. Do Map Google łączymy się zdalnie za pomocą Google API Console.
Na aktualnym etapie prac nie wykorzystujemy pełni reaktywności, lecz pozwala nam to na rozbudowę i dostosowywanie aplikacji zgodnie z potrzebami użytkowników. Niestety, ze względu na Raspberry Pi 3, nie jesteśmy w stanie w pełni wykorzystać potencjału map z powodu zbyt słabego procesora graficznego. Jesteśmy ograniczeni do korzystania z map rastrowych zamiast bardziej rozbudowanych i możliwych do dostosowywania map wektorowych.

## Działanie Aplikacji

Aplikacja działa w następujący sposób:
Preload: Podczas ładowania aplikacja nawiązuje połączenie z bazą danych oraz Mapami Google.
Ładowanie danych: Na mapę nakładane są znaczniki wczytywane z pliku JSON oraz lokalizacja użytkownika.
Widok mapy: Po wczytaniu mapy, uruchamiany jest widok z mapą. Znaczniki po kliknięciu wyświetlają swój szczegółowy opis. Kolor i intensywność (przezroczystość) znacznika oznaczają jego "świeżość":
Czerwony: najbardziej aktualny (<30 min)
Pomarańczowy: średnio aktualny (<90 min)
Zielony półprzezroczysty: mniej aktualny (<5 h)
Znaczniki powyżej 5 godzin się nie wyświetlają.
Znaczniki odświeżają się, jeśli użytkownik zgłosi, że komin termiczny nadal występuje.

## Plany Rozwoju

Docelowo aplikacja nie będzie miała ograniczeń sprzętowych ze względu na wybór innego sprzętu, co pozwoli na dalszą rozbudowę i ulepszanie obecnych funkcji. Przede wszystkim w planach jest:
Usprawnienie obrotu mapy.
Większą kontrolę nad znacznikami.
Możliwość wyłączania niektórych informacji na mapach: np. wyświetlania znaczników sklepów, parków.
Poprawę płynności działania mapy.

## Project Setup

### Install

```bash
$ npm install
```

### Development

```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```
