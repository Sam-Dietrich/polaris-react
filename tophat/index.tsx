import * as React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import * as Polaris from '@shopify/polaris';
import kebabCase from 'lodash/kebabCase';

import Example, {ExampleProps} from './Example';
import ExampleContainer from './ExampleContainer';

interface Component {
  name: string;
  slug: string;
  examples: ExampleProps[];
}

// At the moment the loader pulls in ALL component READMEs based upon a glob
// The filename here has no effect. we just need something that triggers using
// the markdown loader
// eslint-disable-next-line typescript/no-var-requires
const components: Component[] = require('../src/components/README.md');

function renderApp() {
  render(
    <Polaris.AppProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Polaris.Page title="Polaris React component examples">
              <Polaris.Layout>
                {components.map((component) => (
                  <Polaris.Layout.AnnotatedSection
                    title={component.name}
                    description={
                      <div className="componentLinks">
                        <Polaris.Link url={`/${component.slug}`}>
                          View all examples
                        </Polaris.Link>
                      </div>
                    }
                    key={`${component.name}link`}
                  >
                    <Polaris.Card sectioned>
                      <Polaris.List>
                        {component.examples.map(({name}, index) => (
                          <Polaris.List.Item
                            key={`${component.slug}${index}listitem`}
                          >
                            <span
                              className={`${kebabCase(component.name)}Link`}
                            >
                              <Polaris.Link
                                url={`/${component.slug}/${kebabCase(name)}`}
                              >
                                {name}
                              </Polaris.Link>
                            </span>
                          </Polaris.List.Item>
                        ))}
                      </Polaris.List>
                    </Polaris.Card>
                  </Polaris.Layout.AnnotatedSection>
                ))}
              </Polaris.Layout>
            </Polaris.Page>
          </Route>
          {components.map((component) =>
            component.examples.map((example, index) => (
              <Route
                key={`${component.slug}${index}route`}
                path={`/${component.slug}/${kebabCase(example.name)}`}
              >
                <Example code={example.code} name={example.name} />
              </Route>
            )),
          )}
          {components.map((component) => (
            <Route key={component.slug} path={`/${component.slug}`} exact>
              <React.Fragment>
                <Polaris.DisplayText>{component.name}</Polaris.DisplayText>
                {component.examples.map((example) => (
                  <React.Fragment key={example.name}>
                    <ExampleContainer>
                      <Example code={example.code} name={example.name} />
                    </ExampleContainer>
                    <hr />
                  </React.Fragment>
                ))}
              </React.Fragment>
            </Route>
          ))}
          <Route path="/all-components" exact>
            <React.Fragment>
              {components.map((component) =>
                component.examples.map((example) => (
                  <div
                    style={{marginTop: '3rem', marginBottom: '3rem'}}
                    key={`${component.name}/${example.name}`}
                  >
                    <Example code={example.code} name={example.name} />
                  </div>
                )),
              )}
            </React.Fragment>
          </Route>
        </Switch>
      </BrowserRouter>
    </Polaris.AppProvider>,
    document.getElementById('app'),
  );
}

renderApp();
