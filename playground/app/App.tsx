import * as React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {AppProvider} from '@shopify/polaris';
import kebabCase from 'lodash/kebabCase';

import {ComponentReadme} from './types';
import {
  AllComponents,
  ComponentAllExamples,
  ComponentSingleExample,
  ExamplesList,
  Playground,
} from './pages';

export default function App() {
  // At the moment the loader pulls in ALL component READMEs based upon a glob
  // The filename here has no effect. we just need something that triggers using
  // the markdown loader
  // eslint-disable-next-line typescript/no-var-requires
  const components: ComponentReadme[] = require('../../src/components/README.md');

  return (
    <AppProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Playground} />
          <Route
            path="/examples"
            exact
            // eslint-disable-next-line react/jsx-no-bind
            render={(props) => (
              <ExamplesList {...props} components={components} />
            )}
          />
          {components.map((component) =>
            component.examples.map((example, index) => (
              <Route
                path={`/${component.slug}/${kebabCase(example.name)}`}
                exact
                key={`${component.slug}${index}route`}
                // eslint-disable-next-line react/jsx-no-bind
                render={(props) => (
                  <ComponentSingleExample {...props} example={example} />
                )}
              />
            )),
          )}
          {components.map((component) => (
            <Route
              path={`/${component.slug}`}
              exact
              key={component.slug}
              // eslint-disable-next-line react/jsx-no-bind
              render={(props) => (
                <ComponentAllExamples {...props} component={component} />
              )}
            />
          ))}
          <Route
            path="/all-components"
            exact
            // eslint-disable-next-line react/jsx-no-bind
            render={(props) => (
              <AllComponents {...props} components={components} />
            )}
          />
        </Switch>
      </BrowserRouter>
    </AppProvider>
  );
}
