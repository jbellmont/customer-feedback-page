# Customer Feedback Page

A client-side web app that allows users to submit a review for a product.

The reviews submitted are displayed in a list (ordered by the latest review), and the data for the total count of each star-rating is visualised in a bar chart.

- **[Live link](https://customer-feedback-page.onrender.com/)**
- **[Trello Kanban board](https://trello.com/b/h24gm7oB/customer-feedback-page)**

## Installation instructions
1. Clone the repo `git clone https://github.com/jbellmont/customer-feedback-page.git`.
2. Install [Node Version Manager (nvm)](https://github.com/nvm-sh/nvm/blob/master/README.md).
3. Run the command `nvm use` to use the project's Node version.
4. Run the command `npm i` to install dependencies.

## Local development
To run the project locally, use `npm run dev`.

As the project uses `localStorage` to persist data in the browser, for your first time viewing the app there will be no reviews present. Reviews that you add will persist over different sessions, only within the browser used.

## Tech stack
| Technology      | Description | Reason for use |
| ----------- | ----------- | ----------- |
| TypeScript      | Superset of JavaScript       | Ensures project is type-safe, types can be shared between FE and BE (e.g. data models), bugs are caught in the IDE and ability to refactor with confidence. |
| Vite      | Local dev server and bundler       | Incredibly fast local dev spin-up and build times, and much more lightweight compared to Create React App.            |
| React (v17)   | UI library        | Enables you to create single page apps with reusable components. Much smaller API and less opinionated compared to other FE frameworks, with large community support. |
| Material UI   | Component library        | Battle-tested components, perfect for building forms, with clean designs and high levels of accessibility.            |
| Recharts   | Charting library        | Easy to use API for implementing SVG charts. Highly customisable, is well supported, and has clear documentation.          |
| Jest & Testing Library   | Unit and integration tests | Simple to use testing framework, well used and supported in the community. Testing Library extends this to create tests with behaviours that are more realistic to how a user would interact with your app.          |
| Cypress   | e2e tests        | Intuitive API and interface for writing and running e2e tests. Easy to debug. Excellent developer experience.          |
| Eslint   | Linting        | Catch problems in codebase. Set up to auto-fix issues on commit via Husky pre-commit hook. React and accessibility related rule extensions used. |
| Prettier   | Formatting        | Enforces a consistent formatting style. Formats on commit using Husky pre-commit hook.          |
| Github actions   | CI        | CI automation process - testing that builds work and that all unit, integration and e2e tests pass before being allowed to merge to Master.          |
| Render   | CD        | Hosts the app. Connects to the Github repo, and will auto-deploy when there are changes to the Master branch. |

## Requirements met
**Features**
- User can write a review for a product.
- Form captures name, email, comment and rating of 1-to-5 stars.
- User can see all review comments previously submitted.
- A chart visualising the star-rating trends.
- Clean code, structure and architecture, with re-usability in mind.
- High test coverage (currently **92-98%** Jest coverage) using unit, integration and e2e tests.
- Designed cleanly, with accessibility in mind (**100 Accessibility score** in Lighthouse report).
- Abides by web standards.

**Above and beyond**
- On desktop, score of **100** across key Lighthouse categories (Performance, Accessibility, Best Practices, SEO). Performance drops to **86** on mobile, due to unused JavaScript not being used above the fold (see Proposed improvements).
- CI/CD automated process using Github Actions: testing it builds and that all tests pass.
- Pre-commit hook: auto-format and fix linting problems on commit.
- SEO compliant - uses relevant meta head tags. **100 SEO score** on Lighthouse.
- Additional design, functionality and features (see Design features).

## Design features
**Form**
- Material UI TextField used to create re-usable TextInput component, allowing the flexibility for it to be text or email type, and multi or single lined.
- **Bonus feature**: Form validation for max-character limit and email regex check.
- **Bonus feature**: Invalid inputs show error message, tailored to each field.
- Material UI Ratings component used for 1-5 rating; perfectly fits the requirement.
- Form submit button is disabled until form is valid.
- **Bonus feature**: Green success message is displayed on form submisssion, disappearing after 3 seconds.

**Data model**
```
Review {
  id: string;
  date: Date;
  name: string;
  email: string;
  rating: number;
  comment: string;
}
```
- On form submission, the form data is combined with two additional fields `id` and `date`, before being stored in `localStorage`.
- **Bonus feature**: `id` is a randomly generated string using the [uuid npm library](https://www.npmjs.com/package/uuid), ensuring no duplication.
- **Bonus feature**: `date` is a serialized JavaScript date object of when the form was submitted.
- If moving to a database, both `id` and `date` should be generated on the BE instead.

**Data persistance**
- **Bonus feature**: Reviews are stored in `localStorage`, meaning the reviews will persist in different browser sessions.
- Any errors during the adding a new review to `localStorage` will be logged to the console.

**Chart**
- Stacked bar chart has the 5-star score as at the top, making it clear to user that it is the 'best' score in the distribution.
- Visual colour consistency across other parts of the app.

**Latest review comments**
- Displays the latest comment, sorted by most recent date.
- **Bonus feature**: Displays the reviewer's name, date submitted, star-rating, and an avatar of their initials (e.g. John Smith would be JS).
- **Bonus feature**: A scroll to top of page button to improve UX.

## Limitations
- `localStorage` is only scoped to one browser; data does not persist across devices.
- The bar chart does not have in-depth tests due to challenge of testing SVG based charts.
- Only handles one product to review.

## Proposed improvements
- **Improve performance on mobile**: code split, lazy loading the chart JavaScript as it is served below the fold.
- **Handle multiple products**: the data model doesn't have a unique identifier for the product. A `product_id` field should be added to be able to differentiate. This would allow us to fetch data for a specific `product_id`, and show the related reviews.
- **Persist data in a database**: more permanent storage vs `localStorage`. Would allow any user, on any device, to be able to view the same page and content.
- **Pagination**: set a limit to how many reviews are displayed. This would improve user experience (shorter page lengths) and performance (fewer DOM nodes to render).
- **Sort and filter reviews**: e.g. by date, by star-rating. This would allow users to look up reviews based on a number of criteria.
- **Dark mode theme**: for those who struggel to read on lighter backgrounds.
- **Storybook integration**: for running additional component tests, e.g. visual. Add to CI/CD process.
- **Headless CMS integration**: all text is hardcoded; it is not easy for a non-developer to update the copy.
- **Containerisation**: standardise the dev and prod environments, to improve efficiency of deployment, portability and general developer experience.
- **Logging**: if using a database, include logging on any CRUD API read and writes for ease of debugging.
