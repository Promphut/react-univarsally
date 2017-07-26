import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FontIcon from 'material-ui/FontIcon';
import utils from '../../services/utils';
import { withRouter } from 'react-router';

const Container = styled.div`
	padding: 40px 0px 40px 0px;
  	background: ${props => (props.theme.barTone == 'light' ? '#F4F4F4' : props.theme.primaryColor)};
	color: ${props => (props.theme.barTone == 'light' ? '#8E8E8E' : '#FFF')};
	width: 100%;
	margin-top: ${props => props.isStoryPage};
`;

const Content = styled.div`
	display: flex;
	width:90%;
	margin: auto;
`;

const Column = styled.div`
  font-size: 14px;
  color: ${props => (props.theme.barTone == 'light' ? '#8E8E8E' : '#FFF')};
	text-align: left;
	flex: ${props => props.width};
`;

const ColumnHeader = styled.div`
	color: ${props => (props.theme.barTone == 'light' ? '#6e6b6b' : '#FFF')};
	font-weight: bold;
	margin-bottom: 6px;
	font-size: 14px;
`;

const ColumnItemContainer = styled.div`
	padding-top:10px;
`;

const ColumnItem = styled.div`
	margin-top: 6px;
	margin-bottom:15px;
	font-size: 14px;
`;

const SocialContent = styled.ul`
	display: inline;
	list-style-type: none;
	padding-left: 0px;
`;

const SocialContentItem = styled.li`
	display: inline;
	margin-left: 15px;
	margin-right: 0px;

	&:first-child {
		margin-left: 0px;
	}
`;

const InnerLink = styled(Link)`
	color: ${props => (props.theme.barTone == 'light' ? '#8E8E8E' : '#FFF')} !important;
	transition: .2s;

	&:hover {
		color: ${props => props.theme.accentColor} !important;
	}
`;

const SocialLink = styled.a`
	color: ${props => (props.theme.barTone == 'light' ? '#8E8E8E' : '#FFF')} !important;
	transition: .2s;

	&:hover {
		color: ${props => props.theme.accentColor} !important;
	}
`;

const SocialIcon = styled.i`
	height: 14px;
	width:auto;
	padding: 0;
	margin: 0;
`;

const SiteLogoImage = styled.img`
	height: 24px;
	width: auto;
`;

const TheSolarLogo = styled(SiteLogoImage)`
	opacity: 0.7;
`;

const CopyrightText = styled.p`
	font-size: 12px;
	opacity: 0.7;
	font-weight: lighter;
`;

// Mobile Friendly Footer's Styled components

const MobileContainer = styled(Container)`
 padding-top: 14px;
 padding-bottom: 24px;
`;

const MobileContent = styled(Content)`
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const MobileColumnItem = styled(ColumnItem)`
	text-align: center;
	margin-bottom: 0;
	margin-top: ${props => (props.margin ? props.margin : 0)}px
`;

const MobileSocialRow = styled.div`
	display: flex;
	flex-direction: row-reverse;
`;

class Footer extends React.Component {
  static contextTypes = {
    setting: PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    let mar = this.props.isStoryPage ? '120px' : '56px';
    let { theme, channels } = this.context.setting.publisher;
    let theSolarLogoFileName = null;

    // Check for theme
    if (theme.barTone === 'dark') theSolarLogoFileName = 'poweredby_white.svg';
    else theSolarLogoFileName = 'poweredby_black.svg';

    // Footer for Mobile
    if (utils.isMobile()) {
      return (
        <MobileContainer className="sans-font">
          <MobileContent>

            <ColumnItemContainer>

              <MobileColumnItem>
                <SiteLogoImage src={theme.slogo} />
                <SiteLogoImage src={theme.llogo} />
              </MobileColumnItem>

              <MobileColumnItem margin={16}>
                <ColumnItemContainer>
                  {channels &&
                    <SocialContent>
                      {channels.fb &&
                        <SocialContentItem>
                          <SocialLink href={utils.getFbUrl(channels.fb)} target="_blank">
                            <SocialIcon className="fa fa-facebook fa-2x" aria-hidden="true" />
                          </SocialLink>
                        </SocialContentItem>}
                      {channels.twt &&
                        <SocialContentItem>
                          <SocialLink href={utils.getTwtUrl(channels.twt)} target="_blank">
                            <SocialIcon className="fa fa-twitter fa-2x" aria-hidden="true" />
                          </SocialLink>
                        </SocialContentItem>}
                      {channels.yt &&
                        <SocialContentItem>
                          <SocialLink href={utils.getYtUrl(channels.yt)} target="_blank">
                            <SocialIcon className="fa fa-youtube-play fa-2x" aria-hidden="true" />
                          </SocialLink>
                        </SocialContentItem>}
                      {channels.ig &&
                        <SocialContentItem>
                          <SocialLink href={utils.getIgUrl(channels.ig)} target="_blank">
                            <SocialIcon className="fa fa-instagram fa-2x" aria-hidden="true" />
                          </SocialLink>
                        </SocialContentItem>}

                    </SocialContent>}
                </ColumnItemContainer>
              </MobileColumnItem>

              <MobileColumnItem margin={24}>
                <TheSolarLogo src={`/pic/${theSolarLogoFileName}`} />
              </MobileColumnItem>

              <MobileColumnItem margin={5}>
                <CopyrightText>© 2017 LikeMe Co., Ltd. All Right Reserved.</CopyrightText>
              </MobileColumnItem>
            </ColumnItemContainer>

          </MobileContent>
        </MobileContainer>
      );
    }

    // Normal Footer
    return (
      <Container isStoryPage={mar} className="sans-font">
        <Content>
          <Column width={1.5}>
            <ColumnHeader>MENU</ColumnHeader>
            <ColumnItemContainer>
              <ColumnItem><InnerLink to="/">Home</InnerLink></ColumnItem>
              <ColumnItem><InnerLink to="/about">About Us</InnerLink></ColumnItem>
              <ColumnItem><InnerLink to="/stories/news">News</InnerLink></ColumnItem>
            </ColumnItemContainer>
          </Column>

          <Column width={1.5}>
            <ColumnHeader>STORIES</ColumnHeader>
            <ColumnItemContainer>
              <ColumnItem><InnerLink to="/stories/กองทุนไหนดี">กองทุนไหนดี</InnerLink></ColumnItem>
              <ColumnItem>
                <InnerLink to="/stories/อัศวินกองทุน">อัศวินกองทุน</InnerLink>
              </ColumnItem>
              <ColumnItem>
                <InnerLink to="/stories/krungsri-plan-your-money">
                  Krungsri Plan Your Money
                </InnerLink>
              </ColumnItem>
              <ColumnItem>
                <InnerLink to="/stories/aommoney-ideas">aomMONEY IDEAS</InnerLink>
              </ColumnItem>
            </ColumnItemContainer>
          </Column>

          <Column width={2}>
            <ColumnHeader>SUBSCRIBE</ColumnHeader>
            <ColumnItemContainer>
              {channels &&
                <SocialContent>
                  {channels.fb &&
                    <SocialContentItem>
                      <SocialLink href={utils.getFbUrl(channels.fb)} target="_blank">
                        <SocialIcon className="fa fa-facebook fa-2x" aria-hidden="true" />
                      </SocialLink>
                    </SocialContentItem>}
                  {channels.twt &&
                    <SocialContentItem>
                      <SocialLink href={utils.getTwtUrl(channels.twt)} target="_blank">
                        <SocialIcon className="fa fa-twitter fa-2x" aria-hidden="true" />
                      </SocialLink>
                    </SocialContentItem>}
                  {channels.yt &&
                    <SocialContentItem>
                      <SocialLink href={utils.getYtUrl(channels.yt)} target="_blank">
                        <SocialIcon className="fa fa-youtube-play fa-2x" aria-hidden="true" />
                      </SocialLink>
                    </SocialContentItem>}
                  {channels.ig &&
                    <SocialContentItem>
                      <SocialLink href={utils.getIgUrl(channels.ig)} target="_blank">
                        <SocialIcon className="fa fa-instagram fa-2x" aria-hidden="true" />
                      </SocialLink>
                    </SocialContentItem>}

                </SocialContent>}
            </ColumnItemContainer>
          </Column>

          <Column width={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <ColumnItemContainer>
              <ColumnItem style={{ marginTop: '0px', marginBottom: '25px' }}>
                <SiteLogoImage src={theme.slogo} />
                <SiteLogoImage src={theme.llogo} />
              </ColumnItem>
              <ColumnItem>
                <TheSolarLogo src={`/pic/${theSolarLogoFileName}`} />
              </ColumnItem>
              <ColumnItem style={{ marginTop: '-10px' }}>
                <CopyrightText>© 2017 LikeMe Co., Ltd. All Right Reserved.</CopyrightText>
              </ColumnItem>
            </ColumnItemContainer>
          </Column>

        </Content>
      </Container>
    );
  }
}

export default withRouter(Footer);
