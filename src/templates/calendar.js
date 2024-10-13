import React, {useState} from 'react';
import { graphql } from 'gatsby';
import Layout from "../components/layout/layout";
import ContainerBox from '../components/container-box/container-box';
import Seo from '../components/seo/seo';
import { GatsbyImage } from 'gatsby-plugin-image';
import PatternBg from '../components/patterns/pattern-bg';
import Button, { BgMode, BtnType } from '../components/button/button';
import { format, isValid, parse } from 'date-fns';

const CalendarPage = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filterEvents = (events) => {
    return events.filter((event) =>
      (event.title?.toLowerCase() || '').includes(searchQuery) ||
      (event.description?.toLowerCase() || '').includes(searchQuery) ||
      (event.location?.toLowerCase() || '').includes(searchQuery) ||
      (event.type?.toLowerCase() || '').includes(searchQuery)
    );
  };

  const renderSection = (section, index) => {
    switch (section.fieldGroupName) {
      case 'Template_PageBuilder_Pagebuilder_PageBuilder_PageHeader':
        return (
          <ContainerBox key={index} className="c-section--work">
            <div className="c-page-header">
              {section.title && <h1 className="c-page-header__title">{section.title}</h1>}
              <div className="c-page-header__text" dangerouslySetInnerHTML={{ __html: section.text }} style={{ maxWidth: 796 }}></div>
            </div>
            <PatternBg pattern="highlightLeft" className='is-hero-highlight' />
            <PatternBg pattern="heroPattern" className='is-hero-pattern' />
          </ContainerBox>
        );
      case 'Template_PageBuilder_Pagebuilder_PageBuilder_Calendar':
          // First, filter all events based on the search query
        const filteredEvents = section.eventList.filter((event) => 
          (event.title?.toLowerCase() || '').includes(searchQuery) ||
          (event.description?.toLowerCase() || '').includes(searchQuery) ||
          (event.location?.toLowerCase() || '').includes(searchQuery) ||
          (event.type?.toLowerCase() || '').includes(searchQuery)
        );

        // Group the filtered events by month and year
        const eventsByMonth = filteredEvents.reduce((acc, event) => {
          const parsedDate = new Date(event.startDate);
          
          if (!isValid(parsedDate)) {
            console.warn(`Invalid date encountered for event titled "${event.title}":`, event.startDate);
            return acc;
          }

          const monthYear = format(parsedDate, 'MMMM yyyy');
          if (!acc[monthYear]) acc[monthYear] = [];
          acc[monthYear].push({ ...event, parsedDate });
          return acc;
        }, {});

        // Sort the months
        const sortedMonthYears = Object.keys(eventsByMonth).sort((a, b) => {
          const dateA = parse(a, 'MMMM yyyy', new Date());
          const dateB = parse(b, 'MMMM yyyy', new Date());
          return dateA - dateB;
        });

        return (
          <ContainerBox key={index} className="c-section--calendar">
            <div className='c-calendar__search'>
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="c-calendar__search"
              />
            </div>
            <div className="c-calendar">
            {filteredEvents.length === 0 ? (
              <p>No events found for "{searchQuery}".</p>
            ) : (
              sortedMonthYears.map((monthYear) => {
              const filteredEvents = filterEvents(eventsByMonth[monthYear]);
              if (filteredEvents.length === 0) return null; // Skip months with no results
              return (
                <div className='c-calendar__items' key={monthYear}>
                    <h2 className="c-calendar__month c-section__title">
                      <span className='c-icon c-icon--calendar'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" fill="none" viewBox="0 0 24 24"><g><path fill="currentColor" d="M17 13h-5v5h5v-5ZM16 2v2H8V2H6v2H3.01L3 22h18V4h-3V2h-2Zm3 18H5V9h14v11Z"/></g></svg>
                      </span>
                      {monthYear}
                    </h2>
                    {eventsByMonth[monthYear]
                      .sort((a, b) => a.parsedDate - b.parsedDate) // Sort events within the month
                      .map((event, index) => {
                        // const formattedStartDate = format(event.parsedDate, 'MMMM d, yyyy');
                        // const formattedEndDate = format(new Date(event.endDate), 'MMMM d, yyyy');
                        const startDay = format(event.parsedDate, 'd');
                        const startMonth = format(event.parsedDate, 'MMM');
                        // const startYear = format(event.parsedDate, 'yyyy');
                        const endDay = format(new Date(event.endDate), 'd');
                        const endMonth = format(new Date(event.endDate), 'MMM');
                        // const endYear = format(new Date(event.endDate), 'yyyy');
                        return (
                          <div className="c-calendar__event" key={index}>
                            <div className='c-calendar-event__details is-header'>
                              <div className='c-calendar-event__dates'>
                                <span className='c-event-date__start'>
                                  {startDay}
                                {endDay !== startDay && (
                                  <>
                                    <span>-</span>
                                    <span className="c-event-date__end">{endDay}</span>
                                  </>
                                )}
                                </span>
                                <span className='c-event-date__month'>
                                  {startMonth}
                                  {endMonth !== startMonth && (
                                    <span className="c-event-date__month">-{endMonth}</span>
                                  )}
                                </span>
                              </div>
                              {event.image && (
                                <div className='c-calendar-event__img'>
                                  <GatsbyImage
                                    image={event.image.localFile.childrenImageSharp[0].gatsbyImageData}
                                    alt={event.image.altText}
                                  />
                                </div>
                              )}
                            </div>
                            <div className='c-calendar-event__details'>
                              <h3 className="c-calendar-event__title">
                                <a href={event.link.url} target='_blank' rel='noopener noreferrer'>{event.title}</a>
                                <span className='c-calendar-event__type'>{event.type}</span>
                              </h3>
                              <div className='c-calendar-event__info'>
                                <div className='c-calendar-info__items'>
                                  <span className='c-icon c-icon--location'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" fill="none" viewBox="0 0 24 24"><g><path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5Z"/></g></svg>
                                  </span>
                                  <span className='c-calendar-info__value'>{event.location}</span>
                                </div>
                              </div>
                              <div className='c-section__desc c-calendar-event__desc' dangerouslySetInnerHTML={{ __html: event.description }}></div>
                              <div className='c-calendar-event__cta'>
                              <Button
                                url={event.link.url}
                                text={event.link.title}
                                type={BtnType.SECONDARY}
                                bgMode={BgMode.LIGHT}
                                target={event.link.target}
                              />
                              </div>
                              
                            </div>
                          </div>
                        );
                      })}
                  </div>
              );
            })
            )}
            </div>
          </ContainerBox>
        );
      default:
        return null;
    }
  };

  const aboutContent = data.wpPage.template.pageBuilder.pageBuilder;

  return (
    <Layout>
      {aboutContent.map((section, index) => renderSection(section, index))}
    </Layout>
  );
};

export default CalendarPage;

export function Head({ data }) {
  const post = data.wpPage;
  return (
    <>
      <Seo title={post.seo.title} description={post.seo.metaDesc} />
    </>
  );
}

export const pageQuery = graphql`
  query {
    wpPage(slug: { eq: "calendar" }) {
      id
      content
      seo {
        title
        metaDesc
        opengraphImage {
          localFile {
            url
          }
        }
      }
      template {
        ... on WpTemplate_PageBuilder {
          templateName
          pageBuilder {
            fieldGroupName
            pageBuilder {
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_PageHeader {
                fieldGroupName
                fullWidth
                subtitle
                text
                title
                cta {
                  target
                  title
                  url
                }
              }
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Calendar {
                fieldGroupName
                eventList {
                  ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Calendar_EventList_Event {
                    location
                    description
                    endDate
                    fieldGroupName
                    fullDay
                    image {
                      altText
                      localFile {
                        childrenImageSharp {
                          gatsbyImageData
                        }
                      }
                    }
                    link {
                      target
                      title
                      url
                    }
                    startDate
                    timeZone
                    title
                    type
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
