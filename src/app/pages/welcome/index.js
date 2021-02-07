import React from 'react';
import {
    mainStyle
} from './stylesheet';
import {
    ROUTES
} from '../../constants';
import useGlobalState from '../../context';
import {
    Link
} from 'react-router-dom';

const Welcome = () => {
    const [globalState, setGlobalState] = useGlobalState();
    const {
        colors
    } = globalState.theme;
    return <div
        style={mainStyle.container}
    >
        <div style={mainStyle.table}>
            <div style={mainStyle.tableCell}>
                <div style={mainStyle.menuContainer}>
                    <div style={mainStyle.menuTitleContainer}>
                        <img src="/assets/images/icon.svg" height="55px"/>
                        <span style={mainStyle.menuTitle}>Kira Takip Asistan</span>
                    </div>
                    <div style={mainStyle.menuContent}>
                        {
                            ROUTES.map((item, index) => {
                                let itemContainerStyle = {
                                    ...mainStyle.menuItemContainer,
                                    color: item.route === "/dashboard" ? colors.primary : colors.body
                                };
                                return <Link
                                    style={itemContainerStyle}
                                    key={"menu-" + index}
                                    to={item.route}
                                >
                                    <div style={mainStyle.menuItem}>
                                        {item.title}
                                    </div>
                                </Link>;
                            })
                        }
                    </div>
                </div>
                <div style={mainStyle.content}>
                    <div style={mainStyle.imageContainer}>
                        <img
                            src="/assets/images/welcome.jpg"
                            style={mainStyle.image}
                        />
                    </div>
                    <div
                        style={mainStyle.descriptionsContainer}
                    >
                        <div
                            style={mainStyle.title}
                        >
              Hiç bu kadar kolay olmamıştı
                        </div>
                        <div
                            style={mainStyle.description}
                        >
              Dairelerin, Arsaların, Dükkanların takibi
              hiç bu kadar kolay olmamıştı. Sözleşme ve
              kira hatırlatmaları ile <span style={{
                                color: colors.primary 
                            }}>Kira Takip Asistan </span>
              hizmetinizde.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
};
export default Welcome;
