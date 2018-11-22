import * as React from 'react';
import {Card, Layout, Link, List, Page} from '@shopify/polaris';
import kebabCase from 'lodash/kebabCase';
import {ComponentReadme} from '../types';

export interface Props {
  components: ComponentReadme[];
}

export default function Home({components}: Props) {
  return (
    <Page title="Polaris React component examples">
      <Layout>
        {components.map((component) => (
          <Layout.AnnotatedSection
            title={component.name}
            description={
              <div className="componentLinks">
                <Link url={`/${component.slug}`}>View all examples</Link>
              </div>
            }
            key={`${component.name}link`}
          >
            <Card sectioned>
              <List>
                {component.examples.map(({name}, index) => (
                  <List.Item key={`${component.slug}${index}listitem`}>
                    <span className={`${kebabCase(component.name)}Link`}>
                      <Link url={`/${component.slug}/${kebabCase(name)}`}>
                        {name}
                      </Link>
                    </span>
                  </List.Item>
                ))}
              </List>
            </Card>
          </Layout.AnnotatedSection>
        ))}
      </Layout>
    </Page>
  );
}
