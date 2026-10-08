// ==UserScript==
// @name            WME Send to Discord (Reloaded)
// @namespace       https://greasyfork.org/en/users/1558508-darkest-ways-waze
// @description     Script to send unlock/closures/Validations requests to Discord
// @version         2026.10.08.01
// @author          DarkestWays
// @match           *://*.waze.com/*editor*
// @exclude         *://*.waze.com/user/editor*
// @license         MIT/BSD/X11
// @connect         cdn.jsdelivr.net
// @connect         googleapis.com
// @connect         discord.com
// @connect         wazetoolsau.com
// @connect         *.wazetoolsau.com
// @require         https://greasyfork.org/scripts/24851-wazewrap/code/WazeWrap.js
// @require         https://cdn.jsdelivr.net/npm/@turf/turf@7/turf.min.js
// @require         https://wazetoolsau.com/wme-scripts/send-to-discord/dist/lib/wme-send-to-discord-reloaded-data.js
// @grant           GM_info
// @grant           GM_xmlhttpRequest
// @grant           unsafeWindow
// @icon            data:image/png;base64,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
// @homepageURL     https://wazetoolsau.com/wme-scripts/send-to-discord/
// @downloadURL     https://wazetoolsau.com/wme-scripts/send-to-discord/dist/wme-send-to-discord-reloaded.user.js
// @updateURL       https://wazetoolsau.com/wme-scripts/send-to-discord/dist/wme-send-to-discord-reloaded.user.js
// ==/UserScript==

/* eslint-disable no-redeclare */
/* global $ */
/* global WazeWrap */
/* global I18n */
/* global getWmeSdk */
/* global OpenLayers */
/* global unsafeWindow */
/* global turf */
/* global SHEETS_API */
/* global SUPPORTED_LANG */
/* global COUNTRY_LOCKS_DB */
/* global STATE_DB */
/* global LANG_DB */
/* global SERVER_DB */
/* global trustedTypes */
/* eslint-enable no-redeclare */

/**
 * This version of the script is based on last available version of WME Send to Discord (2024.01.14.01), available from
 * https://www.waze-austria.at/index.php/wme-erweiterungen/wme-send-to-discord
 * Old defunct script (while the link is active): https://wms.kbox.at/WME_Send_to_Discord.user.js
 * Previous Author (until v2024.01.14.01): g1220k
 *
 * Old version of this script was based on the code from "WME Send to Slack".
 * Thanks for the great work to the authors of the original script: Tunisiano18
 * (https://github.com/tunisiano187/WME-send-to-slack)
 */
const _WHATS_NEW_LIST = { // New in this version
    '2023.01.08.01': 'Initial Version',
    '2023.01.08.02': 'Added channel for CH',
    '2023.01.09.01': 'Added channel for DE',
    '2023.01.10.01': 'Added DEV cannel and reason for validations',
    '2023.01.10.02': 'Bug fix',
    '2023.01.13.02': 'Bug fix venues to forum channel; added AU Test config',
    '2023.01.13.03': 'Bug fix',
    '2023.01.14.01': 'Added channel for AU',
    '2023.01.14.02': 'Minor changes',
    '2023.01.16.01': 'New Icons; Disabled Web preview',
    '2023.01.17.01': 'Bug fix',
    '2023.02.05.01': 'Bug fix',
    '2023.06.04.01': 'Update for new WME Version. Known bug: Validation icon is still missing',
    '2023.07.13.01': 'Update for new WME Version. Known bug: Validation icon is still missing',
    '2023.07.22.01': '<b>FIX:</b><br>- Removed profile link preview.<br>- Validation icon is back again.<br>- The lock level of the permalink is recognised and applied correctly again',
    '2023.07.25.03': 'Added channel for QA',
    '2023.08.02.01': 'Update for new WME Version.',
    '2023.08.03.01': 'Update for old and new WME Version.',
    '2023.12.10.01': 'Fix of validation icon position.',
    '2024.01.14.01': 'Adjustments to the new beta WME.',
    '2026.06.08.01': 'Partial migration to WME SDK.',
    '2026.06.09.03': 'Fix bugs related to WME SDK migration, closure/lock workflow.',
    '2026.06.10.03': '<b>Fixes:</b><ul><li>Fix incorrect permalink for selected features</li><li>Code clean-up, spelling fixes, and</li><li>Add more SDK support</li></ul>',
    '2026.06.10.04': '<b>Fixes:</b><ul><li>Fix linting errors</li></ul>',
    '2026.06.11.01': '<b>Fixes:</b><ul><li>Fix console logging</li></ul>',
    '2026.09.05.01': '<b>New Feature:</b><ul><li>Use modal dialog box to get user input</li><li>Validate and show preview of the message before sending to Discord</li><li>Major code refactoring</li></ul>',
    '2026.09.05.02': '<b>Fixes:</b><ul><li>Fix bug in string sanitisation and prevent URL previews in Discord</li><li>Show script name and version in the modal footer</li><li>Automatically focus reason field when modal is shown</li></ul>',
    '2026.09.05.03': '<b>Fixes:</b><ul><li>Minor improvements to editor URL used in Discord</li></ul>',
    '2026.09.06.01': '<b>Fixes:</b><ul><li>Migrate Settings tab to WME SDK</li></ul>',
    '2026.09.06.02': '<b>Fixes:</b><ul><li>Add Debug mode to Settings tab</li></ul>',
    '2026.09.06.03': '<b>Fixes:</b><ul><li>Minor improvements and bug fixes</li></ul>',
    '2026.09.07.01': '<b>Fixes:</b><ul><li>Fix bug in showing script updates. Now shows all update messages since last installed version.</li></ul>',
    '2026.09.07.02': '<b>Changes:</b><ul><li>Change icons for closures to use FontAwesome icons instead of images.</li></ul>',
    '2026.09.08.01': '<b>New Feature:</b><ul><li>Show venue name and map comment subject in Discord messages.</li></ul>',
    '2026.09.11.01': '<b>Changes:</b><ul><li>Fix editor icons for ranks 1-6 using self-hosted images.</li><li>General code clean-up</li></ul>',
    '2026.09.11.02': '<b>Changes:</b><ul><li>General code clean-up</li></ul>',
    '2026.09.11.03': '<b>Changes:</b><ul><li>Migrate to WME SDK <i>"wme-selection-changed"</i> event for adding action icons which reduces script response time and improves performance.</li><li>More code modularisation to make adding new features easier</li></ul>',
    '2026.09.11.04': '<b>Changes:</b><ul><li>Rename script to WME Send to Discord (Reloaded)</li></ul>',
    '2026.09.11.05': '<b>Changes:</b><ul><li>More WME SDK Migrations</li></ul>',
    '2026.09.11.06': '<b>Changes:</b><ul><li>WME SDK Migration Complete</li><li>Code clean-up</li></ul>',
    '2026.09.17.01': '<b>Fixes:</b><ul><li>Fix bug where duplicate icons were being created, if URL had segment IDs</li><li>Code clean-up</li></ul>',
    '2026.09.17.02': '<b>Changes:</b><ul><li>Code clean-up</li></ul>',
    '2026.09.17.03': '<b>Changes:</b><ul><li>Move library code to externally required script</li></ul>',
    '2026.09.17.04': '<b>Changes:</b><ul><li>Colour coded log messages based on severity</li></ul>',
    '2026.09.21.01': '<b>New Feature(s):</b><ul><li>Request adding a new Permanent Hazard at a given location (centre of the map or Point-style Map Notes)</li><li><b>NOTE:</b>Please check and update your settings</li></ul>',
    '2026.09.22.01': '<b>Bug Fix(es):</b><ul><li>Fixed issue with Country/State selection changes not updating server configuration correctly</li></ul>',
    '2026.09.22.02': '<b>Changes:</b><ul><li>Minor quality of life changes - In Debug mode show updated channel info on Country/State change</li></ul>',
    '2026.09.23.01': '<b>Changes:</b><ul><li>Minor quality of life changes</li></ul>',
    '2026.09.26.01': '<b>New Features(s):</b><ul><li>New City Seeding request - For segments without a City and no Alternate addresses, a request can be sent to relevant channels</li><li>General code clean-up and fixes</li></ul>',
    '2026.09.26.02': '<b>Change(s):</b><ul><li>Handle edit and undo events to show/hide city seeding icons</li></ul>',
    '2026.10.03.01': '<b>New Feature(s):</b><ul><li>New Satellite Imagery request - On an area-style map note, covering the affected area, a request can be sent to relevant channels</li><li>For certain types of requests, one can now autozoom to the selected feature.</li><li>AutoZoom can be enabled/disabled under Settings (disabled by default)</li></ul><b>Bug Fix(es):</b><ul><li>Fix formatting for lock/unlock requests</li></ul>',
    '2026.10.06.01': '<b>Bug Fix(es):</b><ul><li>Correctly show/hide City Seeding icons on address updates</li></ul>',
    '2026.10.06.02': '<b>Bug Fix(es):</b><ul><li>Correctly show/hide City Seeding icons on missing address</li></ul>',
    '2026.10.08.01': '<b>Change(s):</b><ul><li>Migrate script and lib to GitHub Pages and assets to new location</li></ul>',
};

// Var declaration
const SCRIPT_NAME = GM_info.script.name;
const SCRIPT_VERSION = GM_info.script.version;
const SCRIPT_ID = 'wme-send-to-discord-reloaded';
const SCRIPT_SHORTNAME = 'WME-STD';
const SCRIPT_URL = GM_info.script.downloadURL;
const AUTHOR_URL = "https://www.waze.com/discuss/u/DarkestWays/summary";
const WME_HOSTS = {
    beta: 'beta.waze.com',
    prod: 'www.waze.com'
};
const PARENT_EDIT_PANEL_ID = 'edit-panel';
/*
* Types of supported Selected Features in WME SDK:
*/
const FEATURES = {
    segment: "segment",
    venue: "venue",
    map_comment: "mapComment",
};
const FEATURE_EDITOR_SELECTORS = {
    segment: 'div.segment-feature-editor',
    venue: 'div.venue-feature-editor',
    map_comment: 'div.map-comment-feature-editor',
    // big_junction: 'div.big-junction sidebar-column',
    // permanent_hazard: 'div.permanent-hazard-feature-editor'
};
const EDIT_SECTION_SELECTORS = {
    lock_levels: 'div.lock-edit-view',
    closures: 'div.closures-list',
    alt_streets_label: 'div.alt-streets-control > wz-label',
    map_comment_header: 'div.map-comment-feature-editor > wz-section-header',
};
const WME_ROAD_TYPES = {
    ALLEY: 22,
    FERRY: 15,
    FREEWAY: 3,
    MAJOR_HIGHWAY: 6,
    MINOR_HIGHWAY: 7,
    OFF_ROAD: 8,
    PARKING_LOT_ROAD: 20,
    PEDESTRIAN_BOARDWALK: 10,
    PRIMARY_STREET: 2,
    PRIVATE_ROAD: 17,
    RAILROAD: 18,
    RAMP: 4,
    RUNWAY_TAXIWAY: 19,
    STAIRWAY: 16,
    STREET: 1,
    WALKING_TRAIL: 5,
    WALKWAY: 9,
};
/* Icons for editor ranks
* Icons from USA Wazeopedia (that people don't like :D)
* 1: "https://web-assets.waze.com/discuss/prod/original/3X/7/b/7b5fe2c5573351bb547f8563eab70275bd52e1cc.png"
* 2: "https://web-assets.waze.com/discuss/prod/original/3X/b/c/bc4964cd443e87a9f66616b85433c3beb9d67b42.png"
* 3: "https://web-assets.waze.com/discuss/prod/original/3X/d/e/ded608f14c68d6cf7d14f2ac87adf1e2b9caeffe.png"
* 4: "https://web-assets.waze.com/discuss/prod/original/3X/7/3/73a9ce3dc9be09ced934e1d04ed29264a5f73805.png"
* 5: "https://web-assets.waze.com/discuss/prod/original/3X/d/a/dab24865f429ed233a17d4dd0ead6fbc4c0039b8.png"
* 6: "https://web-assets.waze.com/discuss/prod/original/3X/2/5/251b40060ededb2ff9bfd75eb634025f7893103e.png"
* 7: "https://web-assets.waze.com/discuss/prod/original/3X/2/8/28ccef00852caee92865967bfed0071a2bfb5603.png"
*
* Alternate icons:
* 1. https://web-assets.waze.com/discuss/prod/original/3X/c/3/c3a264233976f7f2b3b847958468aa1d3eacd3ca.png
* 2. https://web-assets.waze.com/discuss/prod/original/3X/3/6/36c27cc7f4d0dc556f822dcbc8553dbd5617aa1b.png
* 3. https://web-assets.waze.com/discuss/prod/original/3X/4/c/4c7014ca7555ad36c2065e1eb46490fc7f842baf.png
* 4. https://web-assets.waze.com/discuss/prod/original/3X/c/5/c5c72f73cc56597a505d3559a0e5719e01710570.png
* 5. https://web-assets.waze.com/discuss/prod/original/3X/8/3/83d599e0a1c64e19c29ee6a7750dc84188629c90.png
* 6. https://web-assets.waze.com/discuss/prod/original/3X/6/e/6e8f070fd650f49b5a63bb784b50f9ac0a637853.png
*
* Another set of icons from user profiles; though Discord doesn't display SVG images:
* 1. https://web-assets.waze.com/webapps/editor-profile/2.2.20-editor-profile-production/assets/L1-2d566b180023a915b5ef.svg
* 2. https://web-assets.waze.com/webapps/editor-profile/2.2.20-editor-profile-production/assets/L2-4ac9a43269b401094ba0.svg
* 3. https://web-assets.waze.com/webapps/editor-profile/2.2.20-editor-profile-production/assets/L3-afdd75587143d1a9de0a.svg
* 4. https://web-assets.waze.com/webapps/editor-profile/2.2.20-editor-profile-production/assets/L4-294df458e118177f72a0.svg
* 5. https://web-assets.waze.com/webapps/editor-profile/2.2.20-editor-profile-production/assets/L5-20671bc18b98128ba3e9.svg
* 6. https://web-assets.waze.com/webapps/editor-profile/2.2.20-editor-profile-production/assets/L6-76f995542d507ca58365.svg
* 7. https://web-assets.waze.com/discuss/prod/original/3X/1/b/1ba208954aff840d1efaed742dde215525667162.png
* */
const EDITOR_RANK_ICONS = {
    1: "https://assets.wazetoolsau.com/wme-send-to-discord/assets/images/L1-2d566b180023a915b5ef.png",
    2: "https://assets.wazetoolsau.com/wme-send-to-discord/assets/images/L2-4ac9a43269b401094ba0.png",
    3: "https://assets.wazetoolsau.com/wme-send-to-discord/assets/images/L3-afdd75587143d1a9de0a.png",
    4: "https://assets.wazetoolsau.com/wme-send-to-discord/assets/images/L4-294df458e118177f72a0.png",
    5: "https://assets.wazetoolsau.com/wme-send-to-discord/assets/images/L5-20671bc18b98128ba3e9.png",
    6: "https://assets.wazetoolsau.com/wme-send-to-discord/assets/images/L6-76f995542d507ca58365.png",
    7: "https://web-assets.waze.com/discuss/prod/original/3X/1/b/1ba208954aff840d1efaed742dde215525667162.png",
};
const ACTIONS = {
    unlock: "Unlock",
    lock: "Lock",
    validation: "Validation",
    closure: "Closure",
    open: "Open",
    settings: "Settings",
    hazard: "Permanent-Hazard",
    sat_images: "New-Satellite-Image",
    city_seeding: "City-Seeding",
};
const ACTION_LOCALES = {};
const ACTION_MIN_ZOOM = {
    [FEATURES.venue]: 17,  // Minimum zoom level for venues should be 17
    [ACTIONS.hazard]: 20, // Better visibility for hazards at zoom level 20
    [ACTIONS.sat_images]: 15, // Better visibility for satellite images at zoom level 15
    [ACTIONS.city_seeding]: 16, // Street Segments can only be selected at zoom level 16 or higher
};
const SAT_IMAGES_REASONS = {
    reason_a: "Sat_Img_Reason_A",
    reason_b: "Sat_Img_Reason_B",
    reason_c: "Sat_Img_Reason_C",
    reason_d: "Sat_Img_Reason_D",
}
const SAT_IMAGES_FRESHNESS = {
    t_1y: "Sat_Img_Freshness_1Y",
    t_6m: "Sat_Img_Freshness_6M",
    t_1m: "Sat_Img_Freshness_1M",
    t_1w: "Sat_Img_Freshness_1W",
}
const SAT_IMAGES_REASONS_LOCALES = {};
const SAT_IMAGES_FRESHNESS_LOCALES = {};
const SERVERS = {
    discord: "discord", // Only Discord is supported for now.
    slack: "slack",
    google: "gform",
    telegram: "telegram"
};
const CHANNELS = {
    forum: "forum",
    editing: "editing",
    closures: "closures",
    sat_images: "sat_images",
    city_seeding: "city_seeding",
};
const KEYS_IDS = {
    WMESTDCountry: "WMESTDCountry",
    WMESTDState: "WMESTDState",
    WMESTDServer: "WMESTDServer",
    WMESTDLanguage: "WMESTDLanguage",
    WMESTDChannel: "WMESTDChannel", // Never used?
    WMESTDLock: "WMESTDLock",
    WMESTDRequestModal: "WMESTDRequestModal",
    WMESTDLockContainer: "WMESTDLockContainer",
    WMESTDClosures: "WMESTDClosures",
    WMESTDValidation: "WMESTDValidation",
    WMESTDPHazard: "WMESTDPHazard",
    WMESTDSatImages: "WMESTDSatImages",
    WMESTDCitySeedingContainer: "WMESTDCitySeedingContainer",
    WMESTDSettings: "WMESTDSettings",
    WMESTDDebug: "WMESTDDebug",
    WMESTDVersion: "WMESTDVersion",
    WMESTDIconPrefix: "WMESTDIconPrefix",
    WMESTDLangAlert: "WMESTDLangAlert",
    WMESTDAutoZoom: "WMESTDAutoZoom",
};
// Icons in variables
const ICON_HEIGHT = "2em";
const ICON_SRC = { // TODO: Consider using localisation strings for titles
    discord: {title: "Discord", src: "data:image/png;base64,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"},
    hazard: {title: "Permanent Hazard", src: "https://web-assets.waze.com/webapps/wme/v2.367-2-g5ef3c024df-20260904145909-production/font/3a07ab5904003127/hazard.svg"},
    ph_camera: {title: "Camera", src: "https://web-assets.waze.com/waze-web-icons/v19.5.0/colorful-svg/speed-camera.svg"},
    ph_nb: {title: "Narrow Bridge", src: "https://web-assets.waze.com/waze-web-icons/v19.5.0/colorful-svg/narrow-bridge.svg"},
    ph_rc: {title: "Raised Crossing", src: "https://web-assets.waze.com/waze-web-icons/v19.5.0/colorful-svg/raised-crosswalk.svg"},
    ph_r_xng: {title: "Railway Crossing", src: "https://web-assets.waze.com/waze-web-icons/v19.5.0/colorful-svg/railway-crossing.svg"},
    ph_sb: {title: "Speed Bump", src: "https://web-assets.waze.com/waze-web-icons/v19.5.0/colorful-svg/speed-bumps.svg"},
    ph_sc: {title: "Sharp Curve", src: "https://web-assets.waze.com/waze-web-icons/v19.5.0/colorful-svg/sharp-curve-ahead.svg"},
    ph_sz: {title: "School Zone", src: "https://web-assets.waze.com/waze-web-icons/v19.5.0/colorful-svg/school-zone.svg"},
    ph_tl: {title: "Traffic Lights", src: "https://web-assets.waze.com/waze-web-icons/v19.5.0/colorful-svg/traffic-light.svg"},
}
// <i class="fa fa-ban"    style="color:#800000; font-size: ${ICON_HEIGHT};"></i>
const I_UNLOCK = `<button id="${KEYS_IDS.WMESTDIconPrefix}-${ACTIONS.unlock}" class="${ACTIONS.unlock}" style="border:none; background-color: transparent;" title="Ask for ${ACTIONS.unlock}"><i class="fa fa-unlock" style="color:#008000; font-size: ${ICON_HEIGHT};"></i></button>`;
const I_RELOCK = `<button id="${KEYS_IDS.WMESTDIconPrefix}-${ACTIONS.lock}" class="${ACTIONS.lock}" style="border:none; background-color: transparent;" title="Ask for ${ACTIONS.lock}"><i class="fa fa-lock" style="color:#FF0000; font-size: ${ICON_HEIGHT};"></i></button>`;
const I_OPEN = `<button id="${KEYS_IDS.WMESTDIconPrefix}-${ACTIONS.open}" class="${ACTIONS.open}" style="border:none; background-color: transparent;" title="Ask for ${ACTIONS.open}"><i class="fa fa-road" style="color:#008000; font-size: ${ICON_HEIGHT};"></i></button>`;
const I_CLOSURE = `<button id="${KEYS_IDS.WMESTDIconPrefix}-${ACTIONS.closure}" class="${ACTIONS.closure}" style="border:none; background-color: transparent;" title="Ask for ${ACTIONS.closure}"><span class="fa fa-stack"><i class="fa fa-road fa-stack-2x" style="color:#708090; font-size: ${ICON_HEIGHT};"></i><i class="fa fa-ban fa-stack-2x" style="color: #800000; font-size: ${ICON_HEIGHT};"></i></span></button>`;
// Randomly choose one of the icons for hazards, to test what users prefer.
const I_PH = [
    `<button id="${KEYS_IDS.WMESTDIconPrefix}-${ACTIONS.hazard}" class="${ACTIONS.hazard}" style="border:none; background-color: transparent; padding-inline: 6px; padding-block: 1px;" title="Ask for ${ACTIONS.hazard}"><i class="fa fa-exclamation-triangle" style="color: #F8A002; font-size: ${ICON_HEIGHT};"></i></button>`,
    `<button id="${KEYS_IDS.WMESTDIconPrefix}-${ACTIONS.hazard}" class="${ACTIONS.hazard}" style="border:none; background-color: transparent;" title="Ask for ${ACTIONS.hazard}">
        <img style="height: ${ICON_HEIGHT}; vertical-align: text-bottom; padding-block: 1px;" alt="${ACTIONS.hazard} icon" src="${ICON_SRC.hazard.src}" />
    </button>`,
];
const I_SAT_VIEW = `<button id="${KEYS_IDS.WMESTDIconPrefix}-${ACTIONS.sat_images}" class="${ACTIONS.sat_images}" style="border:none; background-color: transparent;" title="Ask for ${ACTIONS.sat_images}"><i class="fa fas fa-satellite" style="color:#105AFC; font-size: ${ICON_HEIGHT};"></i></button>`;
const I_CITY_SEEDING = `<button id="${KEYS_IDS.WMESTDIconPrefix}-${ACTIONS.city_seeding}" class="${ACTIONS.city_seeding}" style="border:none; background-color: transparent;" title="Ask for ${ACTIONS.city_seeding}"><i class="fa fas fa-seedling" style="color:#8F4204; font-size: ${ICON_HEIGHT};"></i></button>`;

const I_SETTINGS= `<img id="${KEYS_IDS.WMESTDIconPrefix}-${KEYS_IDS.WMESTDSettings}" title="${SCRIPT_NAME} (${SCRIPT_VERSION}) ${ACTIONS.settings}" alt="${SCRIPT_NAME} ${ACTIONS.settings} icon" style="height: ${ICON_HEIGHT};" src="${ICON_SRC.discord.src}" />`;
// const I_VALIDATION = `<button id="${KEYS_IDS.WMESTDIconPrefix}-${ACTIONS.validation}" class="${ACTIONS.validation}" style="border:none; background-color: transparent;"     title="Ask for ${ACTIONS.validation}"        ><i class="fa fa-check"  style="color:#000000; font-size: ${ICON_HEIGHT};"></i></button>`;

let DEBUG = localStorage.getItem(KEYS_IDS.WMESTDDebug) === "true";
let autoZoom = localStorage.getItem(KEYS_IDS.WMESTDAutoZoom) === "true";

let wmeSdk = null;
let editPanelObserver = null;
// 0-indexed rank of the user, -1 if not logged in (UserRank from WME is only 1-6)
let userRank = -1;
// Default username, if not logged in
let userName = "Unknown";
// By default, navigate to one's own account
let userProfileUrl = "https://www.waze.com/account/";
let actionsLoaded = false;
let neededParams = {
    WMESTDCountry: "",
    WMESTDState: "",
    WMESTDServer: "",
};

let translationsInfo = []
let wmeGETparams = new URLSearchParams(document.location.search.substring(1));
let wmeStdTo = wmeGETparams.get('wmestdto')

// Whether a request for currently selected objects has been sent to Discord; This gets reset when the selection changes (via mutation observer)
let requestSent= false;

// ====================================================================================================================

/* eslint-disable no-console */
// Send easily logs into the console
const LOG = {
    _log: (message, msg_type = 'INFO', colour = '#029918') => {
        const logPrefix = `[${SCRIPT_SHORTNAME} (${SCRIPT_VERSION})]: `
        const msg = (typeof message === 'string') ? message : JSON.stringify(message, null, 2);
        console.log(`${logPrefix}%c${msg_type}: ${msg}`, `color:${colour}`);

    },
    info: (message) => LOG._log(message),
    warn: (message) => LOG._log(message, 'WARN', '#FF4500'),
    error: (message) => LOG._log(message, 'ERROR', '#FF0000'),
    debug: (message) => DEBUG ? LOG._log(message, 'DEBUG', '#4F8CC2') : null,
};
/* eslint-enable no-console */

/**
 * LocalStorage wrapper for getting and setting JSON objects
 * @type {{get: function(*): (any|null|undefined), set: function(*, *): void, remove: function(*): void}}
 */
const LS = {
    get: (key) => {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch (e) {
            LOG.error(`Error parsing localStorage key "${key}": ${e}`);
            return null;
        }
    },
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            LOG.error(`Error setting localStorage key "${key}": ${e}`);
        }
    },
    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            LOG.error(`Error removing localStorage key "${key}": ${e}`);
        }
    }
};

const TRUSTED_TYPE_POLICY = trustedTypes.createPolicy(`${SCRIPT_ID}-policy`, {
    createHTML: (input) => input,
    createScript: (input) => input,
    createScriptURL: (input) => input,
});

// Convert RGB colour to HEX
function rgb2hex(color) {
    const match = color.match(
        /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*([01]?\.?\d+))?\s*\)$/i
    );
    if (!match) return "#AAAAAA"; // Return grey if the input is not a valid RGB(A) colour

    const toHex = (n) => Math.max(0, Math.min(255, Number(n))).toString(16).padStart(2, "0");

    const r = toHex(match[1]);
    const g = toHex(match[2]);
    const b = toHex(match[3]);

    return `#${r}${g}${b}`;
}

// Sanitise a string
function sanitiseString(str) {
    if (typeof str !== 'string') {
        return str;
    }

    let urlRegex = /(https?:\/\/\S+)/g;
    return str.trim()
        .replace(/\n/g, " ") // Replace newlines with spaces
        .replace(/\s+/g, " ") // Replace multiple spaces with a single space
        .replace(/\\/g, "") // Remove backslashes
        .replace(/<\s*(https?:\/\/[^>\s]+)\s*>/g, "$1") // normalize existing <> wrappers
        .replace(urlRegex, (_, url) => `<${encodeURI(url)}>`); // wrap every remaining encoded URL once
}

//Make HTTP Requests via Tampermonkey GM_xmlhttpRequest
function makeHTTPRequest(type, url) {
    return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
            method: type,
            url: url,
            headers: {"Referer": document.location.href},
            onload: function(response) {
                resolve(JSON.parse(response.response));
            },
            onerror: function(error) {
                reject(error);
            }
        });
    });
}

//Auto Lock Change
function autoLockClick (){
    if(document.getElementById('lockRank-4') === null) {
        setTimeout(autoLockClick, 800);
        LOG.debug("Tab is still loading so we'll wait before auto-clicking the lock level");
    } else {
        let levelTo = String(wmeStdTo-1); // FIXME: Should cast str to num first
        let wmeLockLvl='#lockRank-' + levelTo;
        LOG.info(`Trigger click on ${wmeLockLvl}`);
        //        document.getElementById("edit-buttons").style.display = "flex";
        //        document.querySelector("#segment-edit-general > form > div.lock-edit").style.display = "flex"
        document.querySelector("#segment-edit-general > form > div.lock-edit")
        $(wmeLockLvl).click();
    }
}

// Get browser language and load translations
async function localisation () {
    /** Localization Spreadsheet SheetName: same as {@link I18n.locale Browser Locale}
     * @see {@link https://docs.google.com/spreadsheets/d/1kW09NbMJUYU0nNRYUmwsoushZo7I-oQShCfr8hnr_hs/edit?usp=sharing WMESTS Localizations Spreadsheet}
     * @see {@link https://docs.google.com/spreadsheets/d/1-yHvAwVMMPjcqQ7Js0BRusb_3kJbFmGreSIjCBkkcG8/edit?gid=0#gid=0 WMESTD Localizations Spreadsheet}
     */
    let sheetName = SHEETS_API.sheetName
    LOG.info(`Browser locale is: ${I18n.locale}`)

    /**
     * Brings the strings translations from Google Sheets v4 API
     * @param {string} i18n {@link I18n} locale as the browser locale
     * @async
     */
    async function requestTranslations (i18n) {
        const cons_connect_one = SHEETS_API.link + SHEETS_API.sheet + "/values/"
        const cons_connect_two = "!" + SHEETS_API.range + "?key=" + SHEETS_API.key
        let translations = [];
        let sheetsRequestStatus = false

        //Trying to make Beta vs. Prod. Compatibility - HTTP
        if (location.host === WME_HOSTS.beta) {
            await makeHTTPRequest('GET', cons_connect_one + sheetName + cons_connect_two)
                .then(function (response) {
                    LOG.debug(response);
                    $.each(response.values, function (key, val) {
                        if (!(Array.isArray(val) && val.length)) {
                            translations.push("Not Translated")
                        }
                        else {
                            translations.push(val)
                        }
                    });
                    sheetsRequestStatus = true;
                    LOG.debug("Localisation: Tampermonkey HTTP succeeded");
                })
                .catch(function (error) {
                    LOG.error(error);
                    LOG.error("Localisation: Tampermonkey HTTP failed!");
                });
        }
        else {
            await $.get(cons_connect_one + i18n + cons_connect_two)
                .then(function (response) {
                    LOG.debug(response);
                    $.each(response.values, function (key, val) {
                        if (!(Array.isArray(val) && val.length)) {
                            translations.push("Not Translated")
                        }
                        else {
                            translations.push(val)
                        }
                    });
                    sheetsRequestStatus = true;
                    LOG.debug("Localisation: $.get succeeded");
                })
                .catch(function (error) {
                    LOG.error(error);
                    LOG.error("Localisation: $.get failed!");
                });
        }

        sheetsRequestStatus ? LOG.debug('Successfully fetched localisation data using Google Sheets API') : WazeWrap.Alerts.error(SCRIPT_NAME, 'Cannot connect to Google Sheets API');

        // Merge fetched translations into master list
        translationsInfo = translationsInfo.concat(translations.flat(Infinity));
    }

    // Checking if required translations different from any English language
    if (!(["en-US", "en-GB", "en-AU", I18n.defaultLocale].includes(I18n.locale))) {
        // Checking if the language is available for display
        if (SUPPORTED_LANG.includes(I18n.locale)) {
            sheetName = I18n.locale
            try {
                LOG.info(`Loading translations for ${sheetName} locale`);
                await requestTranslations(sheetName); // Modify and ask for local storage before call the request
            } catch (e) {
                LOG.error(`Error while calling 'requestTranslations' function: ${e}`);
            }
        }
        else if (!(SUPPORTED_LANG.includes(I18n.locale))) {
            if (LS.get(KEYS_IDS.WMESTDLangAlert) === SCRIPT_VERSION) {
                LOG.debug('Alert already sent with this version');
            }
            else {
                WazeWrap.Alerts.warning(SCRIPT_NAME, `This language is not yet supported, loading default. \nDo you want a translation? ask your community, or send a request to wmestd@fire.fundersclub.com with a Gmail account to became localizer. \nMissing locale is: ${I18n.locale}`);
                LS.set(KEYS_IDS.WMESTDLangAlert, SCRIPT_VERSION);
            }

            try {
                LOG.info("Loading default locale due to missing translation for the browser locale");
                await requestTranslations(sheetName); // Modify and ask for local storage before call the request
            } catch (e) {
                LOG.error(`Error while calling 'requestTranslations' function: ${e}`);
            }
        }
    }
    else { // Loads default language because no translation is required
        try {
            LOG.info("Loading default locale; no translation required for the browser locale");
            await requestTranslations(sheetName); // Modify and ask for local storage before call the request
        } catch (e) {
            LOG.error(`Error while calling 'requestTranslations' function: ${e}`);
        }
    }

    LOG.info("Localisations loaded correctly");
}

// Setup action locales
function setupActionLocales() {
    ACTION_LOCALES[ACTIONS.closure] = translationsInfo[31]; // Closure
    ACTION_LOCALES[ACTIONS.open] = translationsInfo[32]; // Open
    ACTION_LOCALES[ACTIONS.lock] = translationsInfo[33]; // Lock
    ACTION_LOCALES[ACTIONS.unlock] = translationsInfo[34]; // Unlock
    ACTION_LOCALES[ACTIONS.validation] = translationsInfo[35]; // Validation
    ACTION_LOCALES[ACTIONS.hazard] = translationsInfo[43]; // Permanent Hazard
    ACTION_LOCALES[ACTIONS.sat_images] = translationsInfo[76]; // New Satellite Imagery
    ACTION_LOCALES[ACTIONS.city_seeding] = translationsInfo[77]; // New City Seeding

    LOG.info("Action locales set up");
}

function setupSatImagesLocales() {
    SAT_IMAGES_REASONS_LOCALES[SAT_IMAGES_REASONS.reason_a] = translationsInfo[83]; // Out of date
    SAT_IMAGES_REASONS_LOCALES[SAT_IMAGES_REASONS.reason_b] = translationsInfo[84]; // Low quality/resolution
    SAT_IMAGES_REASONS_LOCALES[SAT_IMAGES_REASONS.reason_c] = translationsInfo[85]; // Significant development
    SAT_IMAGES_REASONS_LOCALES[SAT_IMAGES_REASONS.reason_d] = translationsInfo[86]; // Damaged/Cloudy

    SAT_IMAGES_FRESHNESS_LOCALES[SAT_IMAGES_FRESHNESS.t_1y] = translationsInfo[88];
    SAT_IMAGES_FRESHNESS_LOCALES[SAT_IMAGES_FRESHNESS.t_6m] = translationsInfo[89];
    SAT_IMAGES_FRESHNESS_LOCALES[SAT_IMAGES_FRESHNESS.t_1m] = translationsInfo[90];
    SAT_IMAGES_FRESHNESS_LOCALES[SAT_IMAGES_FRESHNESS.t_1w] = translationsInfo[91];

    LOG.info("Satellite imagery locales set up");
}

// Injects custom CSS into the page for styling the closure icon
function injectCss() {
    const css = [
        '.w-icon.w-icon-closure:after {content: "";position: inherit;width: 3px;height: 100%;top: 0px;background: red;left: 50%;transform: translate(-10%, 0) rotate(45deg);}',
        '.wmestd-ph-icon:focus-visible { outline: 2px solid var(--primary_variant, #4f8cc2); outline-offset: 2px;}'
    ].join(' ');
    $(`<style id="wmestd-styles">${css}</style>`).appendTo('head');
    LOG.info("Custom CSS injected");
}

// Check the version of the script in the browser to Warn if the script has been updates
async function checkScriptVersion() {
    ///////////////////////////////////////
    //         Check for updates         //
    ///////////////////////////////////////
    let installedVersion = LS.get(KEYS_IDS.WMESTDVersion) || localStorage.getItem(KEYS_IDS.WMESTDVersion);
    if (installedVersion) {
        if (installedVersion === SCRIPT_VERSION) {
            LOG.info("Script is up to date");
        }
        else {
            if (!WazeWrap.Interface) {
                setTimeout(checkScriptVersion, 1000);
                LOG.debug("WazeWrap not ready, waiting");
                return;
            }

            LS.set(KEYS_IDS.WMESTDVersion, SCRIPT_VERSION);
            LOG.info(`Script has been updated from ${installedVersion} to ${SCRIPT_VERSION}`);

            let updateNotes = []; // Update Notes
            Object.entries(_WHATS_NEW_LIST).forEach(([version, notes]) => {
                if (installedVersion === version) {
                    updateNotes.push("<span style='font-weight: bold'>What's New?</span>");
                    return;
                }
                if (updateNotes.length) { // Assumed first line has been added above.
                    updateNotes.push(`${version}:<br> ${notes}`);
                }
            });
            // Reverse sort the update notes from second element to last element, so the latest version is on top
            updateNotes = [updateNotes[0], ...updateNotes.slice(1).toReversed()];
            updateNotes.push("&nbsp;");
            LOG.debug(`Update Notes: ${updateNotes.join("; ")}`);

            WazeWrap.Interface.ShowScriptUpdate(SCRIPT_NAME, SCRIPT_VERSION, updateNotes.join("<br><br>"), "");
        }
    }
    else {
        LS.set(KEYS_IDS.WMESTDVersion, SCRIPT_VERSION);
    }
}

// Create Settings Tab
async function loadSettingsTab() {
    // Update the language in the Browser's database
    /*function updateLanguageSelect() {
        let $languageSelect = $(`#${KEYS_IDS.WMESTDLanguage}`);
        $(`#${KEYS_IDS.WMESTDLanguage} option`).each(function () {
            $(this).remove();
        });
        let $languageSelectOptions = document.createElement('option');
        $languageSelectOptions.text = "------";
        if (!LANG_DB[LS.get(KEYS_IDS.WMESTDState)]) {
            $languageSelectOptions.text = "Default";
        }
        $languageSelect.append($languageSelectOptions);
        if (LS.get(KEYS_IDS.WMESTDState) && !LANG_DB[LS.get(KEYS_IDS.WMESTDState)]) {
            LS.set(KEYS_IDS.WMESTDServer, `${LS.get(KEYS_IDS.WMESTDState)}_en`);
            neededParams.WMESTDServer = LS.get(KEYS_IDS.WMESTDServer);
            $languageSelectOptions.selected = true;
        }
        let languageSelected = LANG_DB[LS.get(KEYS_IDS.WMESTDState)];
        for (let key in languageSelected) {
            $languageSelectOptions = document.createElement('option');
            $languageSelectOptions.text = languageSelected[key];
            $languageSelectOptions.value = `${LS.get(KEYS_IDS.WMESTDState)}_${key}`;
            if (LS.get(KEYS_IDS.WMESTDServer) === `${LS.get(KEYS_IDS.WMESTDState)}_${key}`) {
                neededParams.WMESTDServer = LS.get(KEYS_IDS.WMESTDServer);
                $languageSelectOptions.selected = true;
            }
            $languageSelect.append($languageSelectOptions);
        }
    }*/

    // Update the state in the Browser's database
    function updateStateSelect() {
        let $stateSelect = $(`#${KEYS_IDS.WMESTDState}`);
        $(`#${KEYS_IDS.WMESTDState} option`).each(function () {
            $(this).remove();
        });
        let $stateSelectOptions = document.createElement('option');
        $stateSelectOptions.text = translationsInfo[18]; // No State
        if (STATE_DB[LS.get(KEYS_IDS.WMESTDCountry)]) {
            $stateSelectOptions.text = "------"
            $stateSelectOptions.selected = true;
        }
        $stateSelectOptions.id = `${LS.get(KEYS_IDS.WMESTDCountry)}_ns`;
        $stateSelect.append($stateSelectOptions)
        let statesInSelectedCountry = STATE_DB[LS.get(KEYS_IDS.WMESTDCountry)];
        for (let stateKey in statesInSelectedCountry) {
            let stateCode = `${LS.get(KEYS_IDS.WMESTDCountry)}_${stateKey}`;
            $stateSelectOptions = document.createElement('option');
            $stateSelectOptions.text = statesInSelectedCountry[stateKey];
            $stateSelectOptions.id = stateCode;
            $stateSelectOptions.value = stateCode;
            if (LS.get(KEYS_IDS.WMESTDState) === stateCode) {
                $stateSelectOptions.selected = true;
                neededParams.WMESTDState = statesInSelectedCountry[stateKey];
            }
            $stateSelect.append($stateSelectOptions);
        }
        // updateLanguageSelect();
    }

    function updateServerSelect() {
        let $serverSelect = $(`#${KEYS_IDS.WMESTDServer}`);
        if ($serverSelect.length) {
            $serverSelect.find('option').each(function () {
                $(this).remove();
            });
        }
        $serverSelect.append(` ${!LS.get(KEYS_IDS.WMESTDServer) ? '<option>------</option>' : `<option id="${LS.get(KEYS_IDS.WMESTDServer)}" value="${LS.get(KEYS_IDS.WMESTDServer)}" selected aria-selected="true">${LS.get(KEYS_IDS.WMESTDServer)}</option>`} `);
    }

    function updateServerConfig() {
        // If previously selected state doesn't have a language, set the server to the default language for that state.
        if (!LANG_DB[LS.get(KEYS_IDS.WMESTDState)]) {
            LS.set(KEYS_IDS.WMESTDServer, `${LS.get(KEYS_IDS.WMESTDState)}_en`);
            neededParams.WMESTDServer = LS.get(KEYS_IDS.WMESTDServer);
        }
        LOG.debug(`Server config updated: ${neededParams.WMESTDCountry}, ${neededParams.WMESTDState}, ${neededParams.WMESTDServer}`);
    }

    function onCountryChanged() {
        const country_code = this.value;
        const country_name = this.options[this.selectedIndex].text;
        LOG.debug(`Country changed to ${country_code}: ${country_name}`);
        neededParams.WMESTDCountry = country_name;
        LS.set(KEYS_IDS.WMESTDCountry, country_code);
        LS.remove(KEYS_IDS.WMESTDState);
        LS.remove(KEYS_IDS.WMESTDServer);
        // LS.remove(KEYS_IDS.WMESTDLanguage); // Not in use
        // LS.remove(KEYS_IDS.WMESTDChannel); // FIXME: This is key is never used anywhere. Why was it even added?
        if (!STATE_DB[country_code]) { // If the country has no states, set the state to "No State"
            LS.set(KEYS_IDS.WMESTDState, `${country_code}_ns`);
            neededParams.WMESTDState = LS.get(KEYS_IDS.WMESTDState);
        }
        updateStateSelect();
    }

    function onStateChanged() {
        const state_code = this.value;
        const state_name = this.options[this.selectedIndex].text;
        LOG.debug(`State changed to ${state_code}: ${state_name}`);
        neededParams.WMESTDState = state_name;
        LS.set(KEYS_IDS.WMESTDState, state_code);
        // LS.remove(KEYS_IDS.WMESTDLanguage); // Not in use
        // LS.remove(KEYS_IDS.WMESTDChannel); // FIXME: This is key is never used anywhere. Why was it even added?
        // updateLanguageSelect();
        updateServerConfig();
        updateServerSelect();
    }

    /*function onLanguageChanged(event) {
        let selectEl = event.currentTarget;
        LOG.debug(`Language changed to ${selectEl.value}`);
        LS.set(KEYS_IDS.WMESTDServer, selectEl.value);
        neededParams.WMESTDServer = selectEl.value;
    }*/

    return wmeSdk.Sidebar.registerScriptTab().then(({tabLabel, tabPane}) => {
        const settingsHtml = `
<div id="${SCRIPT_ID}-settings" style="padding: 0 1rem;">
    <h6>${SCRIPT_NAME}</h6>
    <span>Current Version: <b>${SCRIPT_VERSION}</b></span>

    <div style="margin-top: 1rem;">
        <label style="width: stretch">
        ${translationsInfo[19]} <!-- Country -->
        <select id="${KEYS_IDS.WMESTDCountry}" class="form-control" style="margin: 8px 0;">
            ${!LS.get(KEYS_IDS.WMESTDCountry) ? '<option>------</option>' : ''}
    ${Object.keys(COUNTRY_LOCKS_DB).map(key => { // Create select-options for Country list
        const selected = (LS.get(KEYS_IDS.WMESTDCountry) === key) ? 'selected' : '';
        if (selected) neededParams.WMESTDCountry = COUNTRY_LOCKS_DB[key].name;
        return `<option id="${key}" value="${key}" ${selected} >${COUNTRY_LOCKS_DB[key].name}</option>`;
    }).join('')}
        </select>
        </label>
    </div>
    <div style="margin-top: 1rem;">
        <label style="width: stretch">
        ${translationsInfo[20]} <!-- State -->
        <select id="${KEYS_IDS.WMESTDState}" class="form-control" style="margin: 8px 0;">
            <option>------</option>
        </select>
        </label>
    </div>
    <div style="margin-top: 1rem;">
        <label style="display: flex; justify-content: flex-start; align-items: center; gap: 8px;" for="${KEYS_IDS.WMESTDDebug}">
            <input id="${KEYS_IDS.WMESTDDebug}" type="checkbox" ${DEBUG ? "checked" : ""} style="margin: 0;" />
            ${translationsInfo[45]}
        </label>
        <label style="display: flex; justify-content: flex-start; align-items: center; gap: 8px;" for="${KEYS_IDS.WMESTDAutoZoom}">
            <input id="${KEYS_IDS.WMESTDAutoZoom}" type="checkbox" ${autoZoom ? "checked" : ""} style="margin: 0;" />
            ${translationsInfo[92]}
        </label>
    </div>
    <div id="${KEYS_IDS.WMESTDChannel}" style="margin-top: 1rem; display: ${DEBUG ? 'block': 'none'};">
        <label style="width: stretch">
            ${translationsInfo[21]} <!-- Channel -->
            <select id="${KEYS_IDS.WMESTDServer}" class="form-control" style="margin: 8px 0;" aria-readonly="true" disabled>
                ${!LS.get(KEYS_IDS.WMESTDServer) ? '<option>------</option>' : `<option id="${LS.get(KEYS_IDS.WMESTDServer)}" value="${LS.get(KEYS_IDS.WMESTDServer)}" selected aria-selected="true">${LS.get(KEYS_IDS.WMESTDServer)}</option>`}
            </select>
        </label>
    </div>
</div>
`;

        // Add all elements to the tab
        tabLabel.innerHTML = TRUSTED_TYPE_POLICY.createHTML(I_SETTINGS);
        tabPane.innerHTML = TRUSTED_TYPE_POLICY.createHTML(settingsHtml);

        // If previously selected country doesn't have states, set the state to "No State".
        if (!STATE_DB[LS.get(KEYS_IDS.WMESTDCountry)]) {
            LS.set(KEYS_IDS.WMESTDState, `${LS.get(KEYS_IDS.WMESTDCountry)}_ns`);
            neededParams.WMESTDState = LS.get(KEYS_IDS.WMESTDState);
        }

        updateStateSelect();
        updateServerConfig();

        // Wire up listeners
        document.getElementById(KEYS_IDS.WMESTDCountry).addEventListener('change', onCountryChanged, false);
        document.getElementById(KEYS_IDS.WMESTDState).addEventListener('change', onStateChanged, false);
        document.getElementById(KEYS_IDS.WMESTDDebug).addEventListener('change', (event) => {
            DEBUG = event.target.checked;
            LS.set(KEYS_IDS.WMESTDDebug, DEBUG);
            $(`#${KEYS_IDS.WMESTDChannel}`).css('display', DEBUG ? 'block' : 'none');
            LOG.warn(`DEBUG mode is now ${DEBUG ? 'enabled' : 'disabled'}`);
        }, false);
        document.getElementById(KEYS_IDS.WMESTDAutoZoom).addEventListener('change', (event) => {
            autoZoom = event.target.checked;
            LS.set(KEYS_IDS.WMESTDAutoZoom, autoZoom);
            LOG.warn(`Auto Zoom is now ${autoZoom ? 'enabled' : 'disabled'}`);
        }, false);
        // document.getElementById(KEYS_IDS.WMESTDLanguage).addEventListener('change', onLanguageChanged, false);

        LOG.info("Settings tab loaded in Sidebar");
    });
}

/**
 * Finds the closest on-screen drivable segment to the given point, ignoring PLR and PR segments if the options are set
 * @function findClosestSegment
 * @param {Point|Polygon} featureGeometry The given point or polygon to which find the closest segment.
 * @param {boolean} ignorePLR If true, "Parking Lot Road" segments will be ignored when finding the closest segment.
 * @param {boolean} ignoreUnnamedPR If true, "Private Road" segments will be ignored when finding the closest segment.
 * @returns {Segment | undefined} The closest segment to the given point, or undefined if no segments are found.
 **/
function findClosestSegment(featureGeometry, ignorePLR, ignoreUnnamedPR) {
    /**
     * Returns an array of all segments in the current extent
     * @function getOnscreenSegments
     * @returns {Segment[]} An array of all segments in the current extent
     **/
    function getOnscreenSegments() {
        let wmeAllSegments = wmeSdk.DataModel.Segments.getAll();
        let wmeMapExtent = wmeSdk.Map.getMapExtent();
        let onScreenSegments = [];

        LOG.debug(`All Segments: ${wmeAllSegments.length}`);
        for (const seg of wmeAllSegments) {
            if (turf.intersect(turf.featureCollection([turf.bboxPolygon(turf.bbox(turf.lineString(seg.geometry.coordinates))), turf.bboxPolygon(wmeMapExtent)]))) {
                onScreenSegments.push(seg);
            }
        }
        LOG.debug(`On-Screen Segments: ${onScreenSegments.length}`);

        return onScreenSegments;
    }

    /**
     * Returns the street name for a given primary street ID
     * @param primaryStreetID
     * @return {string | undefined}
     */
    function getStreetName(primaryStreetID) {
        return wmeSdk.DataModel.Streets.getById({streetId: primaryStreetID})?.name;
    }

    let onscreenSegments = getOnscreenSegments();
    let minDistance = Infinity;
    let closestSegment;

    for (const osSegment of onscreenSegments) {

        let segmentType = osSegment.roadType;
        const ignoredTypes = [WME_ROAD_TYPES.PEDESTRIAN_BOARDWALK, WME_ROAD_TYPES.STAIRWAY, WME_ROAD_TYPES.RAILROAD, WME_ROAD_TYPES.RUNWAY_TAXIWAY];
        if (ignoredTypes.includes(segmentType)) {
            continue;
        }

        if (ignorePLR && segmentType === WME_ROAD_TYPES.PARKING_LOT_ROAD) {
            continue;
        }

        if (ignoreUnnamedPR && segmentType === WME_ROAD_TYPES.PRIVATE_ROAD && !!getStreetName(osSegment.primaryStreetId)) {
            continue;
        }

        try {
            let segmentLine = turf.lineString(osSegment.geometry.coordinates);

            let featurePointPolygon;
            if (featureGeometry.type === 'Point') {
                featurePointPolygon = turf.point(featureGeometry.coordinates);
            } else if (featureGeometry.type === 'Polygon') {
                featurePointPolygon = turf.center(turf.points(featureGeometry.coordinates[0]));
            }

            let distanceToSegment = turf.pointToLineDistance(featurePointPolygon, segmentLine, {units: 'meters'});
            if (distanceToSegment < minDistance) {
                minDistance = distanceToSegment;
                closestSegment = osSegment;
            }
            LOG.debug(`Distance to segment ${closestSegment.id}: ${distanceToSegment} meters`);
        } catch (e) {
            LOG.error(`Error calculating distance to segment ${osSegment.id}: ${e}`);
            break; // Exit the loop if there's an error to avoid further unnecessary calculations
        }
    }
    LOG.debug(`Closest segment found: ${closestSegment ? closestSegment.id : 'None'}`);
    return closestSegment;
}

/**
 * Returns the required rank for a given permanent hazard type based on the country-specific lock levels.
 * @param hazardType
 * @return {*|number} The required rank for the given permanent hazard type, or 2 (L2) if not found in the database.
 */
function getRequiredRankForPH(hazardType) {
    const phType = hazardType.replace(/^ph_/, '');
    return COUNTRY_LOCKS_DB[LS.get(KEYS_IDS.WMESTDCountry)]?.ph_lvl[phType] ?? 2; // Default to L2 if not found
}

/**
 * Returns the required rank for seeding cities based on the country-specific lock levels.
 * @return {*|number}
 */
function getRequiredRankForSeedingCities() {
    return COUNTRY_LOCKS_DB[LS.get(KEYS_IDS.WMESTDCountry)]?.cities ?? 4; // Default to L4 if not found
}

/**
 * Returns the required rank for satellite imagery requests based on the country-specific lock levels.
 * @return {string|number|*}
 */
function getRequiredRankForSatImages() {
    return COUNTRY_LOCKS_DB[LS.get(KEYS_IDS.WMESTDCountry)]?.sat_images ?? 5; // Default to L5 if not found
}

/**
 * Returns an array of cities that are currently in view on the map.
 * @return {Promise<*[]>}
 */
async function getCitiesInView() {
    const mapExtent = wmeSdk.Map.getMapExtent();
    const bbox = turf.bboxPolygon(mapExtent);
    const wmeCities = wmeSdk.DataModel.Cities.getAll();
    const citiesInView = [];

    LOG.debug(`Total cities in WME: ${wmeCities.length}`);

    for (const city of wmeCities) {
        if (turf.booleanPointInPolygon(city.geometry.coordinates, bbox)) {
            LOG.debug(`City in view: ${city.name}`);
            citiesInView.push(city);
        }
    }

    return citiesInView.length ? citiesInView : wmeCities; // Fallback to all cities if none are in view
}

/**
 * Create the permalink for the object or objects crafted request.
 * Called from {@link constructRequest()}.
 * @param {("Unlock"|"Lock"|"Validation"|"Closure"|"Open")} iconAction ACTIONS enum value. Used to determine the required lock level for the request.
 * @returns {{permalink: string, selectionTypeText: string, requiredRank: number, suggestedLockLevel: number, cityName: string, stateName: string, countryName: string, hasUnsavedChanges: boolean} | null} Object containing the permalink and other information about the selection.
 */
function getPermalinkCleaned(iconAction) {
    let urlPrefix = `https://${WME_HOSTS.prod}/editor?env=${wmeSdk.Settings.getRegionCode()}&`;
    let cityName;
    let stateName;
    let countryName;
    let selectedIds;
    let selectionTypeL10n;
    let selectionCount;
    let selectionTypeParam;
    let selectionAddress;
    let hasUnsavedChanges = false;
    /* Required Editor Rank who could act on this request */
    let requiredRank;
    let requiredRanks = [];
    let shouldBeLockedAtDefault = 1; // Default L1, but will be updated based on selection
    let shouldBeLockedAts = [];

    let center = wmeSdk.Map.getMapCenter();
    let mapCenter = new OpenLayers.Geometry.Point(center.lon, center.lat);
    let currentLocCoords = (new OpenLayers.LonLat(mapCenter.x, mapCenter.y)).toString().replace(',', '&'); // lon=x&lat=y
    // Minimum zoom level for venues should be 17
    let currentZoomLevel = wmeSdk.Map.getZoomLevel();
    let zoomLevel = `&zoomLevel=${currentZoomLevel}`;

    /**
     * Recommended Lock. Gets the previously defined by the community lock level for the segment `roadType`.
     * @interface Segment
     * @param {Segment} segment One of selected segment(s) from WME SDK.
     * @returns {number} `ShouldBeLockedAt` as stated in the `RoadType` segment.
     */
    function getShouldBeLockedAt(segment){
        const countryLocks = COUNTRY_LOCKS_DB[LS.get(KEYS_IDS.WMESTDCountry)];
        const countryLockLevel = {
            [WME_ROAD_TYPES.STREET]: countryLocks.str_lvl,
            [WME_ROAD_TYPES.PRIMARY_STREET]: countryLocks.pri_lvl,
            [WME_ROAD_TYPES.FREEWAY]: countryLocks.fwy_lvl,
            [WME_ROAD_TYPES.RAMP]: countryLocks.rmp_lvl,
            [WME_ROAD_TYPES.MAJOR_HIGHWAY]: countryLocks.maj_lvl,
            [WME_ROAD_TYPES.MINOR_HIGHWAY]: countryLocks.min_lvl,
        }
        let shouldBeLockedAt = segment.lockRank + 1; // 0-based index
        let roadType = segment.roadType;

        try {
            return Math.max(shouldBeLockedAt, countryLockLevel[roadType]); // If the recommended lock level is higher than the current lock level
        } catch (e) {
            LOG.error(`Error getting ShouldBeLockedAt for RoadType ${roadType}: ${e}`);
            return shouldBeLockedAtDefault; // Return default lock level if error occurs
        }
    }

    /*
     * Selected features from WME SDK
     *
     * Selection:
     *   | { ids: number[]; localizedTypeName: string; objectType: typeof SEGMENT }; 1+ segments
     *   | { ids: string[]; localizedTypeName: string; objectType: typeof VENUE }; 0|1 venue
     *   | { ids: string[]; localizedTypeName: string; objectType: typeof MAP_COMMENT }; 0|1 map comment
     *   | { ids: number[]; localizedTypeName: string; objectType: typeof SEGMENT_SUGGESTION }; 1+ segment suggestions
     */
    const selectedFeatures = wmeSdk.Editing.getSelection();
    LOG.debug(selectedFeatures);

    // Only proceed if one or more supported features are selected.
    if (!selectedFeatures || !Object.values(FEATURES).includes(selectedFeatures.objectType) || !selectedFeatures.ids) return null;

    // Proceed to build the permalink and other information about the selection.
    selectedIds = selectedFeatures.ids;
    selectionCount = selectedIds.length;

    switch (selectedFeatures.objectType) {
        case FEATURES.segment: {
            selectionTypeL10n = translationsInfo[28]; // segment
            selectionTypeParam = "&segments=";
            // For each selected segment
            for (const segmentId of selectedFeatures.ids) {
                const segment = wmeSdk.DataModel.Segments.getById({segmentId: segmentId});
                selectionAddress = wmeSdk.DataModel.Segments.getAddress({segmentId: segmentId});
                hasUnsavedChanges ||= segmentId < 0;
                requiredRanks.push(segment.lockRank ?? segment.rank); // `lockRank` is user applied lock level, `rank` is the Waze's default lock level for the segment.
                shouldBeLockedAts.push(getShouldBeLockedAt(segment));
                LOG.debug(segment);
            }
            break;
        }
        case FEATURES.venue: {
            const venue = wmeSdk.DataModel.Venues.getById({venueId: selectedIds[0]}); // Could return null if the venue is not found, but we assume it exists since it was selected.
            selectionAddress = wmeSdk.DataModel.Venues.getAddress({venueId: selectedIds[0]});
            selectionTypeL10n = `${venue.isResidential ? `${translationsInfo[70]} `: ""}${translationsInfo[23]}${venue.name ? `: (${venue.name})` : ""}`; // (residential)?venue(: name)?
            selectionTypeParam = "&venues=";
            zoomLevel = `&zoomLevel=${Math.max(currentZoomLevel, ACTION_MIN_ZOOM[FEATURES.venue])}`;
            requiredRanks.push(venue.lockRank);
            LOG.debug(venue);
            break;
        }
        case FEATURES.map_comment: {
            const mapComment = wmeSdk.DataModel.MapComments.getById({mapCommentId: selectedIds[0]});
            const closestSegment = findClosestSegment(mapComment.geometry, true, true);
            selectionAddress = closestSegment ? wmeSdk.DataModel.Segments.getAddress({segmentId: closestSegment.id}) : null; // Map Comment has only geometry (Point|Polygon).
            selectionTypeL10n = `${translationsInfo[26]}${mapComment.subject ? `: (${mapComment.subject})` : ""}` // map comment: subject
            selectionTypeParam = "&mapComments=";
            requiredRanks.push(mapComment.lockRank);
            LOG.debug(mapComment);
            break;
        }
        default:
            LOG.warn(`Unsupported feature type: ${selectedFeatures.objectType}`);
            return null;
    }

    cityName = selectionAddress?.city?.name ?? wmeSdk.DataModel.Cities.getTopCity()?.name ?? "";
    stateName = selectionAddress?.state?.name ?? wmeSdk.DataModel.States.getTopState()?.name ?? "";
    countryName = selectionAddress?.country?.name ?? wmeSdk.DataModel.Countries.getTopCountry()?.name ?? "";

    requiredRank = Math.max(
        Math.max(...requiredRanks, 0), // Get the highest required rank from the selected segments, default to 0 if no segments are selected
        [ACTIONS.closure, ACTIONS.open].includes(iconAction) ? 2 : 0, // If the action is closure or open, ensure the required rank is at least 2 (L3)
        [ACTIONS.hazard].includes(iconAction) ? 1 : 0, // If the action is to add permanent hazard, ensure the required rank is at least 1 (L2)
        [ACTIONS.city_seeding].includes(iconAction) ? 3 : 0, // If the action is to seed new cities, ensure the required rank is at least 3 (L4)
        [ACTIONS.sat_images].includes(iconAction) ? 4 : 0, // If the action is to request new satellite imagery, ensure the required rank is at least 4 (L5)
    ) + 1; // Normalised index to 1-indexed for display purposes (L1-L6)

    let PL = `${urlPrefix}${currentLocCoords}${zoomLevel}${selectionTypeParam}${selectedIds.join(",")}`;

    // Return built object containing all parameters
    LOG.info('Permalink generated');
    return {
        permalink: PL,
        hasUnsavedChanges: hasUnsavedChanges,
        selectionTypeText: selectionCount > 1 ? `${selectionCount} ${selectionTypeL10n}${translationsInfo[29]}` : `${translationsInfo[30]} ${selectionTypeL10n}`, // s or a
        requiredRank: requiredRank,
        suggestedLockLevel: Math.max(...shouldBeLockedAts, shouldBeLockedAtDefault), // This is only used for Lock requests.
        cityName: cityName,
        stateName: stateName,
        countryName: countryName
    };
}

// Creates the modal HTML for the request form
function getRequestModalHtml() {
    // noinspection CssUnresolvedCustomProperty
    return `
<div id="${KEYS_IDS.WMESTDRequestModal}" style="display:none; position:fixed; inset:0; z-index:99999;">
    <div class="wmestd-modal-backdrop" style="position:absolute; inset:0; background: var(--background_modal, #fff);"></div>
    <div class="wmestd-modal-panel" style="position:relative; width:min(760px, 92vw); max-height:90vh; overflow:auto; margin:5vh auto; border-radius:8px; box-shadow:0 8px 30px rgba(0,0,0,.35); padding:16px; background: var(--background_default, #eee);">
        <h3 id="wmestd-modal-title" style="margin:0 0 12px 0; text-overflow: ellipsis; overflow: clip; white-space: nowrap; font-size: 1.5rem">Request Details - ${SCRIPT_NAME}</h3>
        <wz-caption id="wmestd-modal-subtitle" class="subtitle" style="margin:0 0 12px 0; font-weight:normal;">
            ${translationsInfo[63]} <span id="wmestd-modal-subtitle-channel" style="color: var(--hint-text, #aaa); font-weight: bold; border-bottom-style: dotted; border-bottom-width: thin"></span> Discord ${translationsInfo[21]}.
        </wz-caption>

        <div id="wme-reason-and-details-row" style="border:1px solid #ddd; border-radius:6px; padding:10px; margin-bottom:10px;">
            <div id="wmestd-reason-row" style="margin-bottom:10px;">
                <label for="wmestd-reason"><strong>${translationsInfo[1]} *</strong></label>
                <textarea id="wmestd-reason" rows="3" style="width:100%; resize:vertical;" placeholder="${translationsInfo[2]}"></textarea>
            </div>

            <div id="wmestd-details-row" style="margin-bottom:10px;">
                <label for="wmestd-details"><strong>${translationsInfo[7]}</strong></label>
                <textarea id="wmestd-details" rows="3" style="width:100%; resize:vertical;" placeholder="${translationsInfo[61]}"></textarea>
            </div>
        </div>

        <div id="wmestd-lock-row" style="display:none; margin-bottom:10px; border:1px solid #ddd; border-radius:6px; padding:10px;">
            <label for="wmestd-lock-level"><strong>${translationsInfo[64]} *</strong></label>
            <wz-chip-select id="wmestd-lock-level" class="lock-level-selector">
                <div class="lock-level-ranks">
                    ${[1, 2, 3, 4, 5, 6].map((rank) => `<wz-checkable-chip id="wmestd-modal-lockRank-${rank}" value="${rank}" size="md">${rank}</wz-checkable-chip>`).join("")}
                </div>
            </wz-chip-select>
        </div>

        <div id="wmestd-closure-row" style="display:none; margin-bottom:10px; border:1px solid #ddd; border-radius:6px; padding:10px;">
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
                <div>
                    <label for="wmestd-closure-start"><strong>${translationsInfo[65]} *</strong></label><br />
                    <input id="wmestd-closure-start" type="datetime-local" style="height: 2rem;" />
                </div>
                <div>
                    <label for="wmestd-closure-end"><strong>${translationsInfo[66]} *</strong></label><br />
                    <input id="wmestd-closure-end" type="datetime-local" style="height: 2rem;" />
                </div>
                <div>
                    <label for="wmestd-closure-direction"><strong>${translationsInfo[58]} *</strong></label><br />
                    <select id="wmestd-closure-direction" style="height: 2rem;">
                        <option value="A<->B">A&lt;-&gt;B</option>
                        <option value="A->B">A-&gt;B</option>
                        <option value="B->A">B-&gt;A</option>
                    </select>
                </div>
            </div>
            <div style="margin-top:10px;">
                <label style="display:flex; align-items:center; gap:6px;" for="wmestd-mapnote-confirmed">
                    <input id="wmestd-mapnote-confirmed" type="checkbox" style="margin:0 4px 0 0;" />
                    ${translationsInfo[67]}
                </label>
            </div>
        </div>

        <div id="wmestd-permanent-hazard-row" style="display:none; margin-bottom:10px; border:1px solid #ddd; border-radius:6px; padding:10px;">
            <label for="wmestd-permanent-hazard-type" style="display: flex"><strong>${translationsInfo[68]} *</strong></label>
            <wz-caption class="subtitle" style="display: flex; width: stretch; font-weight:normal; color: var(--disabled_text, #999); margin-bottom:5px; margin-top: -5px">${translationsInfo[69]}</wz-caption>
            <div id="wmestd-permanent-hazard-icons" style="display:flex; flex-wrap:wrap; gap:8px;">
                ${Object.entries(ICON_SRC).filter(([key]) => key.startsWith("ph_")).map(([ph_key, ph_icon]) => `
                    <img class="wmestd-ph-icon" data-value="${ph_key}" src="${ph_icon.src}"
                    alt="${ph_icon.title} icon"
                    title="${ph_icon.title} (L${getRequiredRankForPH(ph_key)})"
                    role="button" tabindex="0"
                    style="width:${ICON_HEIGHT}; height:${ICON_HEIGHT}; cursor:pointer; border:1px solid #bbb; border-radius:6px; padding:4px;"
                    />
                `).join("")}
            </div>
            <input type="hidden" id="wmestd-permanent-hazard-type" value="" />
        </div>

        <div id="wmestd-city-seeding-row" style="display:none; margin-bottom:10px; border:1px solid #ddd; border-radius:6px; padding:10px;">
            <label for="wmestd-city-seeding-name" style="display: flex"><strong>${translationsInfo[80]} *</strong></label>
            <input type="text" id="wmestd-city-seeding-name" style="width:100%; resize:vertical;" placeholder="${translationsInfo[81]}" value="" />
        </div>

        <div id="wmestd-sat-images-row" style="display:none; margin-bottom:10px; border:1px solid #ddd; border-radius:6px; padding:10px;">
            <label for="wmestd-sat-images-reason" style="display: flex"><strong>${translationsInfo[82]} *</strong></label>
            <wz-caption class="subtitle" style="display: flex; width: stretch; font-weight:normal; color: var(--disabled_text, #999); margin-bottom:5px; margin-top: -5px">${translationsInfo[94]}</wz-caption>
            <wz-select id="wmestd-sat-images-reason" name="wmestd-sat-images-reason" placeholder="${translationsInfo[97]}">
                ${Object.entries(SAT_IMAGES_REASONS).map(([, reasonValue]) => `<wz-option value="${reasonValue}">${SAT_IMAGES_REASONS_LOCALES[reasonValue]}</wz-option>`).join("")}
            </wz-select>

            <label for="wmestd-sat-images-freshness" style="display: flex; margin-top:10px;"><strong>${translationsInfo[87]} *</strong></label>
            <wz-caption class="subtitle" style="display: flex; width: stretch; font-weight:normal; color: var(--disabled_text, #999); margin-bottom:5px; margin-top: -5px">${translationsInfo[95]}</wz-caption>
            <wz-chip-select id="wmestd-sat-images-freshness" name="wmestd-sat-images-freshness">
                ${Object.entries(SAT_IMAGES_FRESHNESS).map(([, freshnessValue], idx) => `<wz-checkable-chip ${idx === 0 ? 'checked=""' : ""} value="${freshnessValue}" size="lg">${SAT_IMAGES_FRESHNESS_LOCALES[freshnessValue]}</wz-checkable-chip>`).join("")}
            </wz-chip-select>

            <label for="wmestd-sat-images-city" style="display: flex; margin-top:10px;"><strong>${translationsInfo[14]} *</strong></label>
            <input type="text" id="wmestd-sat-images-city" style="width:100%; resize:vertical; margin-top:10px;" placeholder="${translationsInfo[96]}" readonly disabled aria-readonly="true" aria-disabled="true" />
        </div>

        <div id="wme-preview-row" style="margin-bottom:10px; border:1px solid #ddd; border-radius:6px; padding:10px;">
            <label><strong>${translationsInfo[71]}</strong></label>
            <div id="wmestd-preview" style="width: stretch; min-height:160px; box-sizing:border-box; padding:10px; border:1px solid #bbb; border-radius:4px; background:var(--background_variant, #eee); color:var(--content_default, #000); font-family:monospace; white-space:pre-wrap; overflow-wrap:anywhere; box-shadow: 3px 3px 2px 2px var(--shadow_default)"></div>
        </div>

        <div id="wmestd-errors-row" style="display: none; margin-bottom:10px; border:1px solid #f5c2c7; border-radius:6px; padding:10px; background:#fff5f6; color:#842029;">
            <strong>${translationsInfo[72]}:</strong>
            <ul id="wmestd-errors-list" style="margin:8px 0 0 18px; padding:0;"></ul>
        </div>

        <div id="wmestd-footer-row" style="display:flex; justify-content:flex-end; align-items: center; gap:8px;">
            <wz-caption class="subtitle" style="width: stretch; font-weight:normal; color: var(--disabled_text, #999)"> 
                ${SCRIPT_NAME} (${SCRIPT_VERSION}) 
                <span id="wmestd-modal-debug-label" style="display: ${DEBUG ? 'inline' : 'none'}; font-weight: bold; color: var(--cautious_variant, #ECCB49DA)">${translationsInfo[73]}</span>
            </wz-caption>
            <button id="wmestd-cancel-btn" type="button" class="btn btn-danger" style="color: var(--content_default, #fff) !important">${translationsInfo[74]}</button>
            <button id="wmestd-send-btn" type="button" class="btn ${DEBUG ? 'btn-default btn-lightning' : 'btn-primary btn-success'}" style="color: var(--content_default, #fff) !important">${translationsInfo[75]} ${translationsInfo[52]}</button>
        </div>
    </div>
</div>`;
}

/**
 * Collects request details from the user via a modal dialog and returns a Promise that resolves with the collected data.
 * TODO: This function is quite long and could be refactored into functions for better readability and maintainability.
 *  Return object should also be refactored into a class or interface for better type safety and clarity, such that
 *  we only return what is relevant to the request type (lock, closure, city-seeding, etc.) and not all possible fields.
 * @param {("Unlock"|"Lock"|"Validation"|"Closure"|"Open"|"City-Seeding")} iconAction ACTIONS enum value. Used to determine the required lock level for the request.
 * @param {Object} context Context object containing additional information for the request.
 * @param {string} context.permalink The permalink for the selected objects.
 * @param {string} context.textSelection The text representation of the selected objects.
 * @param {Object} context.locationDetails The location details for the request.
 * @param {string} context.locationDetails.city The city name for the request.
 * @param {string} context.locationDetails.state The state name for the request.
 * @param {string} context.locationDetails.country The country name for the request.
 * @param {string} context.locationDetails.formatted The formatted location string for the request.
 * @param {number} context.suggestedLockLevel The suggested lock level for lock/unlock requests.
 * @param {number} context.requiredRank The required rank for the request.
 * @param {string} context.iconActionLocale The localized string for the action type (e.g., "Lock", "Unlock").
 * @param {Function} context.basePreviewBuilder A function that builds the preview text for the request based on the collected data.
 * @returns {Promise<{cancelled: boolean, reason: string, details: string, isLockType: boolean, isClosureType: boolean, isCitySeedingType: boolean, lockLevel: number|null, closureStart: string|null, closureEnd: string|null, closureDirection: string|null, mapNoteConfirmed: boolean, requestedPHType: string|null, citySeedingName: string|null, satImagesFreshness: string|null, satImagesCity: string|null }>} A Promise that resolves with the collected request details.
 * @see {@link getRequestModalHtml} for the modal HTML structure.
 */
function collectRequestViaModal(iconAction, context) {
    // context: { permalink, textSelection, locationDetails, suggestedLockLevel, requiredRank, iconActionLocale, basePreviewBuilder }
    // return: { cancelled, reason, details, isLockType, isClosureType, isCitySeedingType, lockLevel, closureStart, closureEnd, closureDirection, mapNoteConfirmed, requestedPHType, citySeedingName }
    return new Promise((resolve) => {
        if (!document.getElementById(KEYS_IDS.WMESTDRequestModal)) {
            $("body").append(getRequestModalHtml());
        }

        const $modal = $(`#${KEYS_IDS.WMESTDRequestModal}`);
        const $reason = $("#wmestd-reason");
        const $details = $("#wmestd-details");
        const $reasonRow = $("#wmestd-reason-row");
        const $lockRow = $("#wmestd-lock-row");
        const $lockLevel = $("#wmestd-lock-level");
        const $closureRow = $("#wmestd-closure-row");
        const $hazardRow = $("#wmestd-permanent-hazard-row");
        const $citySeedingRow = $("#wmestd-city-seeding-row");
        const $satImagesRow = $("#wmestd-sat-images-row");
        const $satImagesReason = $("#wmestd-sat-images-reason");
        const $satImagesFreshness = $("#wmestd-sat-images-freshness");
        const $satImagesCity = $("#wmestd-sat-images-city");
        const $start = $("#wmestd-closure-start");
        const $end = $("#wmestd-closure-end");
        const $direction = $("#wmestd-closure-direction");
        const $mapNote = $("#wmestd-mapnote-confirmed");
        const $hazardTypeInput = $("#wmestd-permanent-hazard-type");
        const $citySeedingName = $("#wmestd-city-seeding-name");
        const $preview = $("#wmestd-preview");
        const $errorRow = $("#wmestd-errors-row");
        const $errorList = $("#wmestd-errors-list");
        const $debugLabel = $("#wmestd-modal-debug-label");
        const $sendBtn = $("#wmestd-send-btn");
        const wzCheckableChipSelector = "wz-checkable-chip";
        const isLockType = [ACTIONS.lock, ACTIONS.unlock].includes(iconAction);
        const isClosureType = [ACTIONS.closure, ACTIONS.open].includes(iconAction);
        const isHazardType = [ACTIONS.hazard].includes(iconAction);
        const isCitySeedingType = [ACTIONS.city_seeding].includes(iconAction);
        const isSatelliteImageryType = [ACTIONS.sat_images].includes(iconAction);
        const serverName = {
            [ACTIONS.city_seeding]: SERVER_DB[LS.get(KEYS_IDS.WMESTDServer)][SERVERS.discord][`channel_${CHANNELS.city_seeding}`],
            [ACTIONS.sat_images]: SERVER_DB[LS.get(KEYS_IDS.WMESTDServer)][SERVERS.discord][`channel_${CHANNELS.sat_images}`]
        }[iconAction] || neededParams.WMESTDState;

        let skipLockLevelValidation = false;

        const localeDateTimeFormatter = new Intl.DateTimeFormat(undefined, {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
        });

        function getLockLevelChips() {
            return $lockLevel.find(wzCheckableChipSelector);
        }

        function resetAllLockLevelChips() {
            getLockLevelChips().removeAttr("checked").removeAttr("selected").attr("aria-checked", "false");
        }

        function selectLockLevelChip($chip) {
            resetAllLockLevelChips();
            $chip.attr("checked", "").attr("selected", "").attr("aria-checked", "true");
        }

        function getSelectedLockLevelValue() {
            const $selectedChip = getLockLevelChips().filter(`${wzCheckableChipSelector}[checked], ${wzCheckableChipSelector}[selected], ${wzCheckableChipSelector}[aria-checked="true"]`).first();
            const value = Number.parseInt($selectedChip.attr("value") || "", 10);
            return Number.isInteger(value) ? value : 0;
        }

        function setSelectedLockLevel(level) {
            const parsedLevel = parseInt(level, 10);
            const normalizedLevel = String(Number.isNaN(parsedLevel) ? 1 : Math.max(1, Math.min(6, parsedLevel)));
            const $chips = getLockLevelChips();
            const $targetChip = $chips.filter(`[value="${normalizedLevel}"]`).first();
            if ($targetChip.length) {
                selectLockLevelChip($targetChip);
            }
        }

        function disableLockLevelChip(chip) {
            chip.attr("disabled", "true").attr("aria-disabled", "true");
        }

        function enableLockLevelChip(chip) {
            chip.removeAttr("disabled").removeAttr("aria-disabled");
        }

        function disableAllLockLevelChips() {
            getLockLevelChips().attr("disabled", "true").attr("aria-disabled", "true");
        }

        function enableAllLockLevelChips() {
            getLockLevelChips().removeAttr("disabled").removeAttr("aria-disabled");
        }

        function disableLockLevelChipsAbove(level) {
            const parsedLevel = parseInt(level, 10);
            const normalizedLevel = Number.isNaN(parsedLevel) ? 1 : Math.max(1, Math.min(6, parsedLevel));
            getLockLevelChips().each(function () {
                const chipValue = parseInt($(this).attr("value"), 10);
                chipValue > normalizedLevel ? disableLockLevelChip($(this)) : enableLockLevelChip($(this));
            });
        }

        function getSatImagesReasonValue(key) {
            return SAT_IMAGES_REASONS_LOCALES[key] || "";
        }

        function getSatImagesFreshnessValue(key) {
            return SAT_IMAGES_FRESHNESS_LOCALES[key] || "";
        }

        function getSatImagesFreshnessChips() {
            return $satImagesFreshness.find(wzCheckableChipSelector);
        }

        function getSelectedSatImagesFreshnessValue() {
            const $selectedChip = getSatImagesFreshnessChips().filter(`${wzCheckableChipSelector}[checked], ${wzCheckableChipSelector}[selected], ${wzCheckableChipSelector}[aria-checked="true"]`).first();
            return getSatImagesFreshnessValue($selectedChip.attr("value"));
        }

        function setSelectedSatImagesFreshness(value) {
            const $chips = getSatImagesFreshnessChips();
            const $targetChip = $chips.filter(`[value="${value}"]`).first();
            if ($targetChip.length) {
                selectSatImagesFreshnessChip($targetChip);
            }
        }

        function resetAllSatImagesFreshnessChips() {
            getSatImagesFreshnessChips().removeAttr("checked").removeAttr("selected").attr("aria-checked", "false");
        }

        function selectSatImagesFreshnessChip($chip) {
            resetAllSatImagesFreshnessChips();
            $chip.attr("checked", "").attr("selected", "").attr("aria-checked", "true");
        }

        function selectHazardTypeIcon($icon) {
            $(".wmestd-ph-icon").css("outline", "").removeAttr("aria-pressed");
            $icon.css("outline", "2px solid var(--cautious_variant, #4f8cc2)").attr("aria-pressed", "true");
            $hazardTypeInput.val($icon.data("value"));
        }

        function toLocalDateTimeInputValue(date) {
            const d = new Date(date);
            const pad = (value) => String(value).padStart(2, "0");
            return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
        }

        function parseLocalDateTime(value) {
            const parsed = new Date(String(value || ""));
            return Number.isNaN(parsed.getTime()) ? null : parsed;
        }

        function toLocaleDateTime(value) {
            const parsed = parseLocalDateTime(value);
            return parsed ? localeDateTimeFormatter.format(parsed) : "-";
        }

        function clearModalErrors() {
            $errorList.empty();
            $errorRow.hide();
        }

        function showModalErrors(messages) {
            const errors = (Array.isArray(messages) ? messages : [messages]).filter((message) => Boolean(message));
            if (!errors.length) {
                clearModalErrors();
                return;
            }
            $errorList.empty();
            errors.forEach((message) => {
                $errorList.append($("<li></li>").text(String(message)));
            });
            $errorRow.show();
        }

        function buildPreview() {
            const reasonText = sanitiseString($reason.val());
            const detailsText = sanitiseString($details.val());
            const lockLevel = getSelectedLockLevelValue();
            const startValue = String($start.val() || "");
            const endValue = String($end.val() || "");
            const startLocale = toLocaleDateTime(startValue);
            const endLocale = toLocaleDateTime(endValue);
            const lockText = isLockType ? `\n${translationsInfo[57]}: ${lockLevel || "-"}` : "";
            const closureText = isClosureType
                ? `\n${translationsInfo[54]}: ${startLocale}\n${translationsInfo[55]}: ${endLocale}\n${translationsInfo[58]}: ${$direction.val()}\n${translationsInfo[56]}: ${$mapNote.is(":checked") ? `${translationsInfo[59]}` : `${translationsInfo[60]}`}`
                : "";
            const hazardTypeText = isHazardType ? `\n${translationsInfo[68]}: ${$hazardTypeInput.val() ? ICON_SRC[$hazardTypeInput.val()].title : "-"}` : "";
            const citySeedingNameText = sanitiseString($citySeedingName.val());
            const satImagesReasonText = isSatelliteImageryType ? `${getSatImagesReasonValue($satImagesReason.val()) || "-"}` : "";
            const satImagesFreshnessText = isSatelliteImageryType ? `${getSelectedSatImagesFreshnessValue() || "-"}` : "";
            const satImagesCityText = isSatelliteImageryType ? `${$satImagesCity.val() || "-"}` : "";

            const preview = context.basePreviewBuilder({
                reason: reasonText || satImagesReasonText,
                details: detailsText,
                lockLevel: lockLevel,
                closureStart: startLocale,
                closureEnd: endLocale,
                closureDirection: $direction.val(),
                mapNoteConfirmed: $mapNote.is(":checked"),
                requestedPHType: $hazardTypeInput.val(),
                citySeedingName: citySeedingNameText,
                satImagesFreshness: satImagesFreshnessText,
                satImagesCity: satImagesCityText
            });

            // Fallback preview if caller does not provide builder
            $preview.text(preview || [
                `${translationsInfo[13]}: ${context.iconActionLocale || iconAction}`,
                `Selection: ${context.textSelection || "-"}`,
                `Permalink: ${context.permalink || "-"}`,
                `${translationsInfo[14]}: ${context.locationDetails.formatted || "-"}`,
                `${translationsInfo[1]}: ${reasonText || satImagesReasonText || "-"}`,
                `${translationsInfo[7]}: ${detailsText || "-"}`,
                lockText,
                closureText,
                hazardTypeText,
                `${translationsInfo[80]}: ${citySeedingNameText || "-"}`,
                `${translationsInfo[100]}: ${satImagesFreshnessText || "-"}`,
                `${translationsInfo[14]}: ${satImagesCityText || "-"}`
            ].join("\n"));
        }

        // Set up modal title and subtitle, clear inputs, and set up initial state based on request type
        $("#wmestd-modal-title").text(`${context.iconActionLocale} ${translationsInfo[52]} - ${context.locationDetails.formatted || translationsInfo[53]}`);
        $("#wmestd-modal-subtitle-channel").text(`${neededParams.WMESTDCountry}/${serverName}`);
        $reason.val("");
        $details.val("");
        $debugLabel.css("display", DEBUG ? "inline" : "none");
        $sendBtn.toggleClass(["btn-default", "btn-lightning"], DEBUG);
        $sendBtn.toggleClass(["btn-primary", "btn-success"], !DEBUG);

        clearModalErrors();

        if (isLockType) {
            $lockRow.show();
            enableAllLockLevelChips();
            setSelectedLockLevel(context.suggestedLockLevel ?? 1);

            // If the request is to unlock, a user can only request unlock to their current rank or lower, so we should not allow them to select a higher lock level than their current lock level.
            if (iconAction === ACTIONS.unlock) {
                disableLockLevelChipsAbove(userRank);
                setSelectedLockLevel(userRank);
            }

        }
        else {
            $lockRow.hide();
            resetAllLockLevelChips();
            disableAllLockLevelChips();
        }

        if (isClosureType) {
            $closureRow.show();
            const start = new Date();
            const end = new Date(start.getTime() + (24 * 60 * 60 * 1000)); // Default to 24 hours later
            $start.val(toLocalDateTimeInputValue(start));
            $end.val(toLocalDateTimeInputValue(end));
            $direction.val("A<->B");
            $mapNote.prop("checked", false);

            if (iconAction === ACTIONS.open) {
                $closureRow.hide();
            }
        }
        else {
            $closureRow.hide();
            $start.val("");
            $end.val("");
            $direction.val("A<->B");
            $mapNote.prop("checked", false);
        }

        if (isHazardType) {
            $hazardRow.show();
            $hazardTypeInput.val("");
            $(".wmestd-ph-icon").css("outline", "").removeAttr("aria-pressed");
        }
        else {
            $hazardRow.hide();
            $hazardTypeInput.val("");
            $(".wmestd-ph-icon").css("outline", "").removeAttr("aria-pressed");
        }

        if (isCitySeedingType) {
            $citySeedingRow.show();
            $citySeedingName.val("");
        }
        else {
            $citySeedingRow.hide();
            $citySeedingName.val("");
        }

        if (isSatelliteImageryType) {
            $reasonRow.hide();
            $satImagesRow.show();
            $satImagesReason.val("");
            resetAllSatImagesFreshnessChips()
            setSelectedSatImagesFreshness(SAT_IMAGES_FRESHNESS.t_1y);

            LOG.debug(`Setting satellite imagery city input to: ${context.locationDetails.city}`);
            $satImagesCity.val(context.locationDetails.city || "");
            if (!context.locationDetails.city || context.locationDetails.city.trim() === "") {
                LOG.warn("No city name found in context for satellite imagery request. City input will be enabled.");
                try {
                    getCitiesInView().then((cities) => {
                        if (cities.length > 0) {
                            const cityNames = cities.map(city => city.name).filter(name => name && name.trim() !== "");
                            if (cityNames.length > 0) {
                                $satImagesCity.val(cityNames.join(", "));
                            }
                            else {
                                LOG.warn("No valid city names found in the cities in view.");
                            }
                        }
                        else {
                            LOG.warn("No cities found in view for satellite imagery request.");
                        }
                    });
                } catch (error) {
                    LOG.error("Error getting cities in view:", error);
                }
                $satImagesCity.removeAttr("disabled").removeAttr("aria-disabled").removeAttr("readonly").removeAttr("aria-readonly");
            }
            else {
                $satImagesCity.attr("disabled", "true").attr("aria-disabled", "true").attr("readonly", "true").attr("aria-readonly", "true");
            }
        }
        else {
            $reasonRow.show();
            $satImagesRow.hide();
            $satImagesReason.val("");
            resetAllSatImagesFreshnessChips();
            setSelectedSatImagesFreshness(SAT_IMAGES_FRESHNESS.t_1y);
            $satImagesCity.val("");
            $satImagesCity.attr("disabled", "true").attr("aria-disabled", "true").attr("readonly", "true").attr("aria-readonly", "true");
        }

        // Set up event handlers for modal inputs and buttons; TODO: Move validation logic to a separate function, possibly outside of the modal
        $modal.off("input change click keydown");
        $modal.on("input change", "input, textarea, select", () => {
            clearModalErrors();
            buildPreview();
        });
        $modal.on("click", "#wmestd-lock-level wz-checkable-chip", (event) => {
            selectLockLevelChip($(event.currentTarget));
            clearModalErrors();
            buildPreview();
        });
        $modal.on("change", "#wmestd-sat-images-reason", () => {
            clearModalErrors();
            buildPreview();
        });
        $modal.on("click", "#wmestd-sat-images-freshness wz-checkable-chip", (event) => {
            selectSatImagesFreshnessChip($(event.currentTarget));
            clearModalErrors();
            buildPreview();
        });
        $modal.on("click keydown", ".wmestd-ph-icon", (e) => {
            if (e.type === "keydown" && e.key !== "Enter" && e.key !== " ") return;
            if (e.type === "keydown") e.preventDefault();
            selectHazardTypeIcon($(e.currentTarget));
            clearModalErrors();
            buildPreview();
        });
        $modal.on("click", "#wmestd-cancel-btn, .wmestd-modal-backdrop", () => {
            clearModalErrors();
            $modal.hide();
            resolve({cancelled: true});
        });
        $modal.on("click", "#wmestd-send-btn", () => {
            const reason = sanitiseString($reason.val()) || getSatImagesReasonValue($satImagesReason.val());
            const lockLevel = getSelectedLockLevelValue();
            const citySeedingName = sanitiseString($citySeedingName.val());
            const satImagesFreshness = getSelectedSatImagesFreshnessValue();
            const satImagesCity = sanitiseString($satImagesCity.val());
            const validationErrors = [];

            if (!reason) {
                validationErrors.push(`${translationsInfo[48]}.`);
            }

            if (isLockType && !skipLockLevelValidation && (userRank >= Math.max(context.requiredRank, lockLevel))) {
                validationErrors.push(`${translationsInfo[47]}.`);
                $modal.hide();
                WazeWrap.Alerts.confirm(SCRIPT_NAME,
                    `${translationsInfo[5]}\r\n${translationsInfo[46]}`,
                    () => { // Request already sent, send again
                        LOG.info("Editor level check triggered, user decided to continue anyway.");
                        skipLockLevelValidation = true;
                        $modal.show();
                    },
                    () => LOG.warn("User can edit this themselves, so no request is sent."),
                    `${translationsInfo[59]}`, `${translationsInfo[60]}`);
            }

            if (isClosureType) {
                if (!($start.val() && $end.val())) {
                    validationErrors.push(`${translationsInfo[49]}.`);
                }
                const startDate = parseLocalDateTime($start.val());
                const endDate = parseLocalDateTime($end.val());
                if (($start.val() || $end.val()) && !(startDate && endDate)) {
                    validationErrors.push(`${translationsInfo[50]}.`);
                }
                if (startDate && endDate && endDate <= startDate) {
                    validationErrors.push(`${translationsInfo[51]}.`);
                }
            }

            if (isHazardType && !skipLockLevelValidation) {
                if (!$hazardTypeInput.val()) {
                    validationErrors.push(`${translationsInfo[79]} ${translationsInfo[44].toLowerCase()}.`);
                }
                else if (userRank >= Math.max(context.requiredRank, getRequiredRankForPH($hazardTypeInput.val()))) {
                    validationErrors.push(`${translationsInfo[78]}.`);
                    $modal.hide();
                    WazeWrap.Alerts.confirm(SCRIPT_NAME,
                        `${translationsInfo[5]}\r\n${translationsInfo[46]}`,
                        () => { // Request already sent, send again
                            LOG.info("Editor level check triggered, user decided to continue anyway.");
                            skipLockLevelValidation = true;
                            $modal.show();
                        },
                        () => LOG.warn("User can edit this themselves, so no request is sent."),
                        `${translationsInfo[59]}`, `${translationsInfo[60]}`);
                }
            }

            if (isCitySeedingType && !citySeedingName) {
                validationErrors.push(`${translationsInfo[81]}.`);
                $citySeedingName.val(""); // Clear the input field to prompt the user to enter a value
            }

            if (isSatelliteImageryType) {
                if (!satImagesCity) {
                    validationErrors.push(`${translationsInfo[96]}.`);
                }
            }

            if (validationErrors.length) {
                showModalErrors(validationErrors);
                return;
            }

            clearModalErrors();
            $modal.hide();
            resolve({
                cancelled: false,
                reason,
                isLockType,
                isClosureType,
                details: sanitiseString($details.val()),
                lockLevel: isLockType ? lockLevel : null,
                closureStart: isClosureType ? toLocaleDateTime($start.val()) : null,
                closureEnd: isClosureType ? toLocaleDateTime($end.val()) : null,
                closureDirection: isClosureType ? $direction.val() : null,
                mapNoteConfirmed: isClosureType ? $mapNote.is(":checked") : null,
                requestedPHType: $hazardTypeInput.val() || null,
                citySeedingName: isCitySeedingType ? citySeedingName : null,
                satImagesFreshness: isSatelliteImageryType ? satImagesFreshness : null,
                satImagesCity: isSatelliteImageryType ? satImagesCity : null
            });
        });

        // Build initial preview and show modal
        buildPreview();
        $modal.show();
        if ($reason.is(":visible")) {
            $reason.trigger("focus");
        } else if ($details.is(":visible")) {
            $details.trigger("focus");
        }
    });
}

// Construction of the request
async function constructRequest(iconAction) {
    LOG.info(`Constructing request for action: ${iconAction}`);
    let channel;
    const currentSelectedServerConfig = SERVER_DB[LS.get(KEYS_IDS.WMESTDServer)];
    const iconActionLocale = ACTION_LOCALES[iconAction] || iconAction; // Default to action if not found in locales
    const unsavedCount = wmeSdk.Editing.getUnsavedChangesCount();

    const plCleaned = getPermalinkCleaned(iconAction);

    if (plCleaned.hasUnsavedChanges || unsavedCount > 0) {
        WazeWrap.Alerts.error(SCRIPT_NAME, translationsInfo[9]); // Unsaved_Objects
        return; // Exit early if there are unsaved changes
    }

    let permalink = plCleaned.permalink;
    let requiredRank = plCleaned.requiredRank;
    const textSelection = plCleaned.selectionTypeText;
    const shouldBeLockedAt = plCleaned.suggestedLockLevel; // This is only used for Lock requests.

    const cityName = plCleaned.cityName;
    const stateName = plCleaned.stateName;
    const countryName = plCleaned.countryName;
    const locationDetails = {
        city: cityName,
        state: stateName,
        country: countryName,
        formatted: formattedLocationDetails()
    }; // Join city, state and country names, only if they aren't empty

    function formattedLocationDetails(city = cityName, state = stateName, country = countryName) {
        return [city, state, country].filter(Boolean).filter(x => typeof x === 'string' && Boolean(x.trim())).join(", ");
    }

    // START: New workflow for modal dialog to collect request details; This will replace the current prompt-based workflow
    // 1) Determine static context first (iconActionLocale, channel candidate, etc.)

    /**
     * Builds message lines for the request based on provided parameters.
     * @param context Object containing the parameters for building the message.
     * @param context.reason
     * @param context.details
     * @param context.lockLevel
     * @param context.closureStart
     * @param context.closureEnd
     * @param context.closureDirection
     * @param context.mapNoteConfirmed
     * @param context.requestedPHType
     * @param context.citySeedingName
     * @param context.satImagesFreshness
     * @param context.satImagesCity
     * @return {string[]} Array of message lines to be sent in the request.
     */
    function messageBuilder({ reason, details, lockLevel, closureStart, closureEnd, closureDirection, mapNoteConfirmed, requestedPHType, citySeedingName, satImagesFreshness, satImagesCity }) {
        let messageLines = [
            `**${translationsInfo[10]}**: [${userName}](<${userProfileUrl}>) (*${translationsInfo[11]}${userRank}*)`, // User
            `**${translationsInfo[12]}**: [${textSelection}](<${permalink}>)`, // Link
            `**${translationsInfo[14]}**: ${formattedLocationDetails() || "-"}`, // Location
            `**${translationsInfo[1]}**: ${reason || "-"}`, // Reason
        ];
        details && messageLines.push(`**${translationsInfo[7]}**: ${details}`); // Details
        let footerLines = ["", `-# Powered by [${[SCRIPT_NAME, SCRIPT_VERSION].join(" ")}](<${SCRIPT_URL}>) *updated by [DarkestWays](<${AUTHOR_URL}>) *`, " "]; // Footer

        switch (iconAction) {
            case ACTIONS.lock:
                messageLines.splice(3, 0, `**${translationsInfo[33]}**: ${translationsInfo[3]} ${lockLevel ?? "-"}`); // Lock: To level
                break;
            case ACTIONS.unlock:
                messageLines.splice(3, 0, `**${translationsInfo[34]}**: ${translationsInfo[3]} ${lockLevel ?? "-"}`); // Unlock: To level
                break;
            case ACTIONS.closure:
                messageLines.push(
                    `**${translationsInfo[54]}**: ${closureStart ?? "-"}`,
                    `**${translationsInfo[55]}**: ${closureEnd ?? "-"}`,
                    `**${translationsInfo[58]}**: ${closureDirection ?? "-"}`,
                    `**${translationsInfo[56]}**: ${mapNoteConfirmed === null ? "-" : (mapNoteConfirmed ? `${translationsInfo[59]}` : `${translationsInfo[60]}`)}`
                );
                break;
            case ACTIONS.hazard:
                messageLines.splice(3, 0, `**${translationsInfo[68]}**: ${requestedPHType === null ? "-" : (requestedPHType ? ICON_SRC[requestedPHType].title : "-")}`); // Permanent Hazard: Type
                break;
            case ACTIONS.city_seeding:
                messageLines.splice(3, 0, `**${translationsInfo[80]}**: ${citySeedingName || "-"}`);
                break;
            case ACTIONS.sat_images:
                messageLines.splice(2, 1, `**${translationsInfo[14]}**: ${formattedLocationDetails(satImagesCity) || "-"}`); // Location may need to be updated to the city selected for satellite imagery requests
                messageLines.splice(4, 0, `**${translationsInfo[100]}**: ${satImagesFreshness || "-"}`);
                break;
            default:
                break;
        }

        return [...messageLines, ...footerLines];
    }

    const modalResult = await collectRequestViaModal(iconAction, {
        permalink,
        textSelection,
        locationDetails,
        requiredRank,
        suggestedLockLevel: shouldBeLockedAt,
        iconActionLocale,
        basePreviewBuilder: ({ reason, details, lockLevel, closureStart, closureEnd, closureDirection, mapNoteConfirmed, requestedPHType, citySeedingName, satImagesFreshness, satImagesCity }) => {
            let phRankLevel = requestedPHType ? getRequiredRankForPH(requestedPHType) : 0;
            let citySeedingRankLevel = citySeedingName ? getRequiredRankForSeedingCities() : 0;
            let satImageRankLevel = satImagesFreshness ? getRequiredRankForSatImages() : 0;
            let requiredRankLevel = Math.max(lockLevel, phRankLevel, citySeedingRankLevel, satImageRankLevel, requiredRank);

            LOG.debug(`Computed required rank level for preview: ${requiredRankLevel} (Lock: ${lockLevel}, PH: ${phRankLevel}, City Seeding: ${citySeedingRankLevel}, Sat Image: ${satImageRankLevel}, Base Required: ${requiredRank})`);
            LOG.debug(`Preview details: reason=${reason}, details=${details}, lockLevel=${lockLevel}, closureStart=${closureStart}, closureEnd=${closureEnd}, closureDirection=${closureDirection}, mapNoteConfirmed=${mapNoteConfirmed}, requestedPHType=${requestedPHType}, citySeedingName=${citySeedingName}, satImagesFreshness=${satImagesFreshness}, satImagesCity=${satImagesCity}`);

            let previewLines = [
                `# (${translationsInfo[11]}${requiredRankLevel}) - ${iconActionLocale}`, // L; `(LX) - Action`
                ...messageBuilder({ reason, details, lockLevel, closureStart, closureEnd, closureDirection, mapNoteConfirmed, requestedPHType, citySeedingName, satImagesFreshness, satImagesCity })
            ];
            // Build same structure you later send to Discord
            return previewLines.join("\n");
        }
    });
    LOG.debug("Modal Result: " + JSON.stringify(modalResult, null, 2));

    if (modalResult.cancelled) {
        WazeWrap.Alerts.warning(SCRIPT_NAME, translationsInfo[16]);//'Nothing sent'
        return; // Exit early
    }

    // 2) Map normalised modal data by action type
    switch (iconAction) {
        case ACTIONS.lock:
        case ACTIONS.unlock: {
            channel = CHANNELS.editing;
            const requestedLock = modalResult.lockLevel;
            // This is if the requested lock level is higher than the computed required rank for the selected segments, we need to update it to the requested level
            requiredRank = requestedLock > requiredRank ? requestedLock : requiredRank;
            permalink = `${permalink}&wmestdto=${requestedLock}`;
            break;
        }

        case ACTIONS.validation: {
            channel = CHANNELS.editing;
            break;
        }

        case ACTIONS.closure:
        case ACTIONS.open: {
            channel = CHANNELS.closures;
            break;
        }

        case ACTIONS.hazard: {
            channel = CHANNELS.editing;
            let phRankLevel = getRequiredRankForPH(modalResult.requestedPHType);
            requiredRank = Math.max(phRankLevel, requiredRank);
            // Find a way to replace the zoomLevel URL-param with required zoom level for permanent hazards. This is of the form `&zoomLevel=XX` where XX is the required zoom level for permanent hazards.
            if (modalResult.requestedPHType) {
                permalink = permalink.replace(/&zoomLevel=\d+/, `&zoomLevel=${ACTION_MIN_ZOOM[ACTIONS.hazard]}`);
            }
            break;
        }

        case ACTIONS.city_seeding: {
            channel = CHANNELS.city_seeding;
            requiredRank = getRequiredRankForSeedingCities();
            break;
        }

        case ACTIONS.sat_images: {
            channel = CHANNELS.sat_images;
            requiredRank = getRequiredRankForSatImages();
            break;
        }

        default: {
            LOG.error(`Unknown action type: ${iconAction}`);
            WazeWrap.Alerts.error(SCRIPT_NAME, `Unknown action type: ${iconAction}`);
            return;
        }
    }

    let finalMessageLines = messageBuilder({
        reason: modalResult.reason,
        details: modalResult.details,
        lockLevel: modalResult.lockLevel,
        closureStart: modalResult.closureStart,
        closureEnd: modalResult.closureEnd,
        closureDirection: modalResult.closureDirection,
        mapNoteConfirmed: modalResult.mapNoteConfirmed,
        requestedPHType: modalResult.requestedPHType,
        citySeedingName: modalResult.citySeedingName,
        satImagesFreshness: modalResult.satImagesFreshness,
        satImagesCity: modalResult.satImagesCity,
    });
    let TextToSend = finalMessageLines.join("\r\n");

    if (DEBUG) {
        LOG.debug("Final message lines: " + JSON.stringify(finalMessageLines, null, 2));
        WazeWrap.Alerts.info(`${SCRIPT_NAME} Request Created`, TextToSend, true, true, 5000);
        WazeWrap.Alerts.info(`${SCRIPT_NAME} Permalink`, `<a href="${permalink}" target="_blank">${permalink}</a> `, false, true, 5000);

    }
    // END: New workflow for modal dialog to collect request details

    // Get the webhooks. TODO: Move this to a separate function that returns the webhook URL based on the selected server and channel.
    for (let destination in currentSelectedServerConfig) {
        LOG.debug(`Processing Server Key: ${destination}, Channel: ${channel}, Icon Action: ${iconAction}`);
        switch (destination.toLowerCase()) {
            case SERVERS.discord: {
                let destinationServer = currentSelectedServerConfig[destination];

                let jsonPayload = {
                    "username": `(${translationsInfo[11]}${requiredRank}) - ${iconActionLocale}`, // L; `(LX) - Action`;
                    "avatar_url": EDITOR_RANK_ICONS[requiredRank],
                    "content": TextToSend
                };

                // Add `thread_name` to the payload if the selected server is a forum type and the country name is not empty
                if (destinationServer[`type_${channel}`] === CHANNELS.forum) {
                    if (!countryName) {
                        WazeWrap.Alerts.error(SCRIPT_NAME, translationsInfo[16] + " Thread Name is empty!") // Nothing sent
                        break;
                    }
                    else {
                        jsonPayload = {
                            ...jsonPayload,
                            "thread_name": locationDetails.formatted
                        }
                    }
                }

                LOG.debug(jsonPayload);

                // "Sending request to Discord ..."
                if (DEBUG) {
                    WazeWrap.Alerts.info(`${SCRIPT_NAME} Sending Request`, JSON.stringify(jsonPayload, null, 2), false, true);
                    requestSent = true;
                }
                else {
                    GM_xmlhttpRequest({
                        method: "POST",
                        url: destinationServer[channel],
                        headers: {'Content-Type': 'application/json'},
                        data: JSON.stringify(jsonPayload),
                        onload: (response) => {
                            LOG.debug(response.responseText);
                            WazeWrap.Alerts.success(SCRIPT_NAME, translationsInfo[15]); // "Request Sent"
                            requestSent = true;
                        },
                        onerror: (error) => {
                            LOG.error(error);
                            WazeWrap.Alerts.error(SCRIPT_NAME, `${translationsInfo[62]}:\r\n${error} `);
                        }
                    });
                }
                break;
            }
            default:
                WazeWrap.Alerts.warning(SCRIPT_NAME, translationsInfo[16]); // 'Nothing sent'
        }
    }

} // constructRequest End

// Prepare the role of the icons
async function setupIconActions() {
    // Check if the required parameters are set in the Settings tab
    function checkNeededParams() {
        // Inits
        LOG.debug("Checking the needed parameters");
        let check = true;

        // Check all needed params
        for (let key in neededParams) {
            if (!LS.get(key)) {
                LOG.error(`Missing required parameter: ${key}`);
                check = false;
                break;
            }
        }

        return check;
    }

    async function clickHandler(event) {
        const $button = $(event.currentTarget);
        const iconAction = $button.attr('class');
        const iconData = $button.data();
        LOG.debug(`Clicked on icon: ${iconAction}`);

        async function _autoZoomToSelection() {
            return new Promise((resolve, reject) => {

                function waitAndResolve({waitFor = 0, retValue = ""}) {
                    // Sleep for a short duration to allow Data Models to update.
                    setTimeout(() => {
                        resolve(retValue);
                    }, waitFor); // waitFor milliseconds
                }

                if (autoZoom) {
                    try {
                        LOG.debug(`Auto zooming to selection for ${iconAction}: ${JSON.stringify(iconData)}`);
                        const objectGeometry = iconData.affectedObject.geometry;
                        const objectBBox = turf.bbox(objectGeometry);
                        const requiredZoomLevel = ACTION_MIN_ZOOM[iconAction];

                        LOG.debug(`Centering and zooming to object's extent: ${JSON.stringify(objectBBox)}, Required Min Zoom Level: ${requiredZoomLevel}`);
                        wmeSdk.Map.centerMapOnGeometry({geometry: objectGeometry});
                        wmeSdk.Map.zoomToExtent({bbox: objectBBox});

                        const currentZoomLevel = wmeSdk.Map.getZoomLevel();
                        if (currentZoomLevel < requiredZoomLevel) {
                            // This is lower than recommended zoom level for this action.
                            // Let's ask the user if they want to zoom in to the required level or cancel.
                            // wmeSdk.Map.setZoomLevel({zoomLevel: requiredZoomLevel});
                            const message = translationsInfo[98].replace("{{current}}", currentZoomLevel).replace("{{recommended}}", requiredZoomLevel);
                            WazeWrap.Alerts.confirm(SCRIPT_NAME, `${message}\r\n\r\n<em>Hint: ${translationsInfo[99]}.</em>`,
                                () => waitAndResolve({waitFor: 1000, retValue: `User chose to continue with current zoom level: ${currentZoomLevel}, which is below the recommended level of ${requiredZoomLevel}`}),
                                () => reject(`Zoom level too low. Current: ${currentZoomLevel}, Required: ${requiredZoomLevel}`),
                                `${translationsInfo[59]}`, `${translationsInfo[60]}`
                            );
                        } else {
                            waitAndResolve({waitFor: 125});

                        }
                        LOG.info(`Auto zoomed to level ${wmeSdk.Map.getZoomLevel()}`);
                    } catch (e) {
                        LOG.error(`Error auto zooming to selection: ${e}`);
                        waitAndResolve({waitFor: 0}); // Resolve anyway to allow the request to proceed, even if zooming fails.
                    }
                } else {
                    waitAndResolve({waitFor: 0});
                }
            });
        }

        async function _callConstructRequest() {
            try {
                await _autoZoomToSelection().then(() => {
                    constructRequest(iconAction);
                });
            } catch (e) {
                LOG.error(`Error sending request: ${e}`);
            }
        }

        if (checkNeededParams()) {
            LOG.debug(`Params have been set; Was a requestSent already? ${requestSent}`);
            if (requestSent) {
                LOG.info("Request already sent");
                WazeWrap.Alerts.confirm(SCRIPT_NAME, `${translationsInfo[17]}?`,
                    async () => { // Request already sent, send again
                        LOG.info("User wants to send again");
                        await _callConstructRequest();
                    }, () => LOG.warn("User cancelled sending again"),
                    `${translationsInfo[59]}`, `${translationsInfo[60]}`);
            }
            else {
                await _callConstructRequest();
            }
        }
        else {
            WazeWrap.Alerts.error(SCRIPT_NAME, translationsInfo[22]); // Missing settings, please set all the following dropdown in the left panel
            // Open the Userscripts Sidebar panel if it isn't already open, then open the settings tab.
            if (!$('#drawer [selected] .w-icon.w-icon-script').length) {
                $('.w-icon-script').trigger('click');
            }
            setTimeout(() => {
                // Find parent 'a' element of my settings image id and activate that
                $(`#${KEYS_IDS.WMESTDIconPrefix}-${KEYS_IDS.WMESTDSettings}`).closest('a').trigger('click');
            }, 200);

        }
    }

    if (!actionsLoaded) {
        $(document).on("click", `button[id|="${KEYS_IDS.WMESTDIconPrefix}"]`, clickHandler);
        // $(document).on("click", `img[id|="${KEYS_IDS.WMESTDIconPrefix}"]`, clickHandler); // May end up targeting other icons, so let's not do this for now.
        actionsLoaded ||= true;
    }
}

async function setupEditPanelActionIcons() {
    LOG.debug("Selection changed, setting up action icons if needed.");

    // Reset requestSent flag
    requestSent = false;

    const FEATURE_ICON_CONFIG = {
        [FEATURES.segment]: {
            editorSelector: FEATURE_EDITOR_SELECTORS.segment,
            requiredSelectors: [EDIT_SECTION_SELECTORS.lock_levels, EDIT_SECTION_SELECTORS.closures, EDIT_SECTION_SELECTORS.alt_streets_label],
            addIcons: (panel) => {
                _addLockIcons(panel.querySelector(EDIT_SECTION_SELECTORS.lock_levels));
                _addClosureIcons(panel.querySelector(EDIT_SECTION_SELECTORS.closures));
                _addPHIcons(panel.querySelector(EDIT_SECTION_SELECTORS.lock_levels));
                _addCitySeedingIcons(panel.querySelector(EDIT_SECTION_SELECTORS.alt_streets_label));
            }
        },
        [FEATURES.map_comment]: {
            editorSelector: FEATURE_EDITOR_SELECTORS.map_comment,
            requiredSelectors: [EDIT_SECTION_SELECTORS.lock_levels, EDIT_SECTION_SELECTORS.map_comment_header,
                {hostElement: EDIT_SECTION_SELECTORS.map_comment_header, selector: "div.wz-section-header", shadow: true}],
            addIcons: (panel) => {
                _addLockIcons(panel.querySelector(EDIT_SECTION_SELECTORS.lock_levels));
                _addPHIcons(panel.querySelector(EDIT_SECTION_SELECTORS.lock_levels));
                _addSatImageryIcons(panel.querySelector(EDIT_SECTION_SELECTORS.map_comment_header));
            }
        },
        [FEATURES.venue]: {
            editorSelector: FEATURE_EDITOR_SELECTORS.venue,
            requiredSelectors: [EDIT_SECTION_SELECTORS.lock_levels],
            addIcons: (panel) => {
                _addLockIcons(panel.querySelector(EDIT_SECTION_SELECTORS.lock_levels));
            }
        },
        // Add new features here only — no other code changes needed
    };

    function _resetEditPanelContainer(editPanel){
        LOG.debug("Resetting various edit panel containers that we may have created previously");
        const $lockContainerDiv = $(`#${KEYS_IDS.WMESTDLockContainer}`);
        if ($lockContainerDiv.length > 0) {
            LOG.debug("\tLock container found; Removing it.");
            $lockContainerDiv.remove();
        } else {
            LOG.debug("\tLock container not found; No need to remove it.");
        }
        // Now add it back in the correct place, after the lock levels section
        LOG.debug("\tAdding lock container after the lock levels section.");
        $(editPanel.querySelector(EDIT_SECTION_SELECTORS.lock_levels)).after(`<div id="${KEYS_IDS.WMESTDLockContainer}" style="display: flex; justify-content: flex-start; align-items: center; gap: 0.5rem; margin: 0.5rem 0 0.5rem 0;"></div>`);

        // Reset/Unwrap City Seeding container
        const $citySeedingContainerDiv = $(`#${KEYS_IDS.WMESTDCitySeedingContainer}`);
        if ($citySeedingContainerDiv.length > 0) {
            LOG.debug("\tCity Seeding container found; Unwrapping it.");
            $(editPanel.querySelector(EDIT_SECTION_SELECTORS.alt_streets_label)).unwrap(`#${KEYS_IDS.WMESTDCitySeedingContainer}`); // Unwrap the container from the alt streets label section
        } else {
            LOG.debug("\tCity Seeding container not found; No need to unwrap it.");
        }

        LOG.debug("Edit panel containers have been reset, if present.");
    }

    function _addLockIcons(element) {
        LOG.debug("Adding lock icons to the edit panel");
        const $lockContainerDiv = $(element).siblings(`div#${KEYS_IDS.WMESTDLockContainer}`);
        if ($lockContainerDiv.length === 0) {
            LOG.debug(`Lock container not found; Adding lock icons directly after the lock levels section.`);
            $(`#${KEYS_IDS.WMESTDLock}`).remove();
            $(element).after(`<div id="${KEYS_IDS.WMESTDLock}" style="display: inline-block;"> ${I_UNLOCK} &nbsp; ${I_RELOCK} </div>`);
        } else {
            LOG.debug(`Lock container found; Adding lock icons inside the container.`);
            $lockContainerDiv.append(I_UNLOCK, I_RELOCK);
        }
        LOG.debug('Lock icons added');
    }

    function _addPHIcons(element) {
        LOG.debug("Adding PH icons to the edit panel, next to existing lock icons");

        // First get the selected features: Could be a segment, multiple segments or a map comment
        // Single segment selection is easy, since there is only one geometry to consider.
        // Map Comments are always singular, hence also simple to get its geometry
        // Multiple segment selections are complicated, since we must first merge all their geometries!!
        // First, lets focus on map comments only.
        let selectedFeature;
        if (selectedFeatures.objectType === FEATURES.map_comment) {
            try {
                selectedFeature = wmeSdk.DataModel.MapComments.getById({mapCommentId: selectedFeatures.ids[0]});
            } catch (e) {
                LOG.error(`Error while getting affected features: ${e}`);
            }
        }

        const $lockContainerDiv = $(element).siblings(`div#${KEYS_IDS.WMESTDLockContainer}`);
        const $iconContainer = $(`<div id="${KEYS_IDS.WMESTDPHazard}" style="display: inline-block;"></div>`);
        const $hazardIcon = $(I_PH[Math.floor(Math.random() * I_PH.length)]); // Randomly select one of the PH icons to display
        $hazardIcon.data({"affectedObject": selectedFeatures.objectType === FEATURES.map_comment ? selectedFeature : wmeSdk.DataModel.Segments.getById({segmentId: selectedFeatures.ids[0]}), "affectedObjectType": selectedFeatures.objectType});
        if ($lockContainerDiv.length === 0) {
            LOG.debug(`Lock container not found; Adding PH icons directly after the lock levels section.`);
            $(`#${KEYS_IDS.WMESTDPHazard}`).remove();
            $iconContainer.append($hazardIcon);
            $(element).after($iconContainer);
        } else {
            LOG.debug(`Lock container found; Adding PH icons inside the container.`);
            $lockContainerDiv.append($hazardIcon);
        }
        LOG.debug('PH icons added');
    }

    function _addSatImageryIcons(element) {
        try {
            // Only add Sat Imagery icons if the selected feature is an area map comment.
            const mapComment = wmeSdk.DataModel.MapComments.getById({mapCommentId: selectedFeatures.ids[0]});
            if (!mapComment || mapComment.isPoint) {
                LOG.debug("Selected feature is not an area map comment; Not adding Sat Imagery icons.");
                return;
            }

            LOG.debug("Adding Sat Imagery icons to the edit panel, next to existing comment header");
            const $shadowSecHeader = $(element.shadowRoot.querySelector("div.wz-section-header"));
            const shadowHeaderBG = getComputedStyle($shadowSecHeader[0]).backgroundColor;
            LOG.debug(`Current Shadow DOM's BG: ${shadowHeaderBG}; Shadow DOM: ${$shadowSecHeader[0]}`);
            $shadowSecHeader.css({backgroundColor: `${rgb2hex(shadowHeaderBG)}00`, pointerEvents: 'none'});

            const $iconContainer = $(`<div id="${KEYS_IDS.WMESTDSatImages}" style="display: flex; align-items: center; justify-content: flex-end; margin-top: -3rem; margin-bottom: 1rem; padding-right: 1rem;"></div>`);
            $iconContainer.append($(I_SAT_VIEW).data({"affectedObject": mapComment, "affectedObjectType": FEATURES.map_comment}));
            $(element).after($iconContainer);
            LOG.debug('Sat Imagery icons added');
        } catch (e) {
            LOG.error(`Could not add Sat Imagery icons. ${e}`);
        }
    }

    function _addCitySeedingIcons(element) {
        // Don't add City Seeding button, if:
        // more than one segment have been selected, or
        // selected segment has its city set already, or
        // current editor's rank is at or above the required rank for City Seeding.

        try {
            const segment = wmeSdk.DataModel.Segments.getById({segmentId: selectedFeatures.ids[0]});
            const primaryStreet = segment.primaryStreetId ? wmeSdk.DataModel.Streets.getById({streetId: segment.primaryStreetId}) : null;
            const city = primaryStreet && primaryStreet.cityId ? wmeSdk.DataModel.Cities.getById({cityId: primaryStreet.cityId}) : null;

            if (selectedFeatures.ids.length !== 1 || userRank >= getRequiredRankForSeedingCities()) {
                LOG.debug("More than one segment selected or user rank is at or above the required rank for City Seeding; Not adding City Seeding icons.");
                return;
            }

            // If there are no alternateStreetIds, we can add City Seeding icons.
            // Assumption: If there are alternateStreetIds, the segment is already seeded with a city.
            if (segment.alternateStreetIds && segment.alternateStreetIds.length > 0) {
                LOG.debug("Selected segment has alternate street IDs; Not adding City Seeding icons.");
                return;
            }

            if (city && !city.isEmpty) {
                LOG.debug(`Selected segment's primary street has a non-empty city: ${city.name}; Not adding City Seeding icons.`);
                return;
            }

            LOG.debug("Adding City Seeding icons to the edit panel, next to existing Add alternate address button, enclosing them in a flex container");
            $(element).wrap(`<div id="${KEYS_IDS.WMESTDCitySeedingContainer}" style="display: flex; align-items: center; justify-content: flex-end; margin-bottom: -2rem"></div>`)
                .after($(I_CITY_SEEDING).data({"affectedObject": segment, "affectedObjectType": FEATURES.segment}));
            LOG.debug('City Seeding icons added');
        } catch (e) {
            LOG.error(`Could not add City Seeding icons. ${e}`);
        }
    }

    function _addClosureIcons(element) {
        LOG.debug("Adding closure icons to the edit panel");
        let $clDiv = $(element);
        $(`#${KEYS_IDS.WMESTDClosures}`).remove();
        $clDiv.before(`<div id="${KEYS_IDS.WMESTDClosures}" style="display: flex; justify-content: flex-start; align-items: center; gap: 1rem; margin-bottom: 0.5rem;"> ${I_CLOSURE} ${I_OPEN} </div>`);
        $clDiv.height("auto");
        LOG.debug('Closure icons added');
    }

    async function setupIconsForFeature(selectedFeatures, editPanel) {
        const featureType = selectedFeatures.objectType;
        const config = FEATURE_ICON_CONFIG[featureType];

        if (!config) {
            LOG.warn(`Unsupported feature type: ${featureType}; Not adding action icons.`);
            return null;
        }

        /**
         * Resolves a selector for the given edit panel and requested element.
         * @param editPanel
         * @param reqElement {string|function|{hostElement: string, selector: string, shadow: boolean}} - The requested element to resolve.
         * If it's a string, it will be used as a normal selector.
         * If it's a function, it will be called with the edit panel as an argument and should return the target element. Future release.
         * If it's an object, it should have the following properties:
         * @param reqElement.hostElement {string} - The selector for the host element.
         * @param reqElement.selector {string} - The selector for the target element within the host.
         * @param reqElement.shadow {boolean} - Whether to look inside the shadow DOM of the host element.
         * @return {*|null}
         */
        function resolveSelector(editPanel, reqElement) {
            if (typeof reqElement === "string") return editPanel.querySelector(reqElement); // previous behaviour for normal selectors

            if (typeof reqElement === "function") return reqElement(editPanel); // in case we decide to pass a function to resolve the selector dynamically for some future feature

            // Otherwise, reqElement is an object with {hostElement: string, selector: string, shadow: boolean} where we want to target some shadow DOM element.
            const hostElement = editPanel.querySelector(reqElement.hostElement);
            if (!hostElement) return null;

            const root = reqElement.shadow ? hostElement.shadowRoot : hostElement;
            return root?.querySelector(reqElement.selector) ?? null;
        }

        function allSelectorsPresent() {
            return config.requiredSelectors.every((req) => Boolean(resolveSelector(editPanel, req)));
        }

        if (allSelectorsPresent()) {
            LOG.debug(`All required selectors found for ${featureType}.`);
            try {
                _resetEditPanelContainer(editPanel);
                config.addIcons(editPanel);
            } catch (e) {
                LOG.error(`Error adding icons for ${featureType}: ${e}`);
            }
            await setupIconActions();
            return;
        }

        LOG.debug(`Not all required selectors found for ${featureType}. Required selectors: ${config.requiredSelectors.map((req) => JSON.stringify(req)).join(", ")}; Setting up MutationObserver.`);
        const observeTarget = editPanel.querySelector(config.editorSelector) ?? editPanel;
        editPanelObserver = new MutationObserver(async (_mutations, observer) => {
            LOG.debug(`MutationObserver triggered for ${featureType} edit panel.`);
            if (allSelectorsPresent()) {
                LOG.debug(`Required selectors found; Disconnecting observer.`);
                observer.disconnect();
                editPanelObserver = null;
                _resetEditPanelContainer(editPanel);
                config.addIcons(editPanel);
                await setupIconActions();
            } else {
                LOG.debug(`Required selectors still not found for ${featureType}. Waiting for next mutation.`);
            }
        });
        editPanelObserver.observe(observeTarget, { childList: true, subtree: true });
    }

    // Disconnect existing observer
    if (editPanelObserver) {
        LOG.debug("Disconnecting existing edit panel observer before setting up a new one.");
        editPanelObserver.disconnect();
        editPanelObserver = null;
    }

    // Now get current selection to check whether we need to add icons
    const selectedFeatures = wmeSdk.Editing.getSelection();
    LOG.debug(selectedFeatures);

    // Only proceed if one or more supported features are selected.
    if (!selectedFeatures || !Object.values(FEATURES).includes(selectedFeatures.objectType) || !selectedFeatures.ids) {
        LOG.debug("No supported features selected; No action required.");
        return null;
    }

    // Check if edit panel exists; generally it should though many scripts modify DOM
    const editPanel = document.getElementById(PARENT_EDIT_PANEL_ID);
    if (!editPanel) { // Normally this would not happen.
        LOG.warn(`Edit panel with ID ${PARENT_EDIT_PANEL_ID} not found.`);
        return null;
    }

    LOG.debug(`Setting up action icons for selected feature type: ${selectedFeatures.objectType}; Waiting briefly to ensure edit panel is fully rendered before adding icons.`);
    // Sleep is necessary since selection switch, without a deselection, triggers the event twice in quick succession, and the edit panel may not be fully rendered yet, or it contains old DOM elements.
    setTimeout(setupIconsForFeature, 150, selectedFeatures, editPanel);
}

async function segmentChangeHandler({affectedObject}) {
    try {
        const segment = wmeSdk.DataModel.Segments.getById({segmentId: affectedObject.objectId});
        let $citySeedingContainer = $(`#${KEYS_IDS.WMESTDCitySeedingContainer}`);

        function toggleCitySeedingIcons(show) {
            // Break early if there is no container present for some reason
            if ($citySeedingContainer.length === 0) {
                LOG.debug("No City Seeding container found in the edit panel; No action required.");
                return;
            }

            $citySeedingContainer.find(`button[id|="${KEYS_IDS.WMESTDIconPrefix}"]`).toggle(show);
            $citySeedingContainer.css('margin-bottom', show ? '-2rem' : 'unset'); // Reset margin-bottom to default; if !show
        }

        // Break early if a segment isn't found
        if (!segment) {
            LOG.warn(`Segment with ID ${affectedObject.objectId} not found; No action required.`);
            return;
        }

        // If a segment has alternateStreetIds, we need to remove City Seeding icons.
        if (segment.alternateStreetIds && segment.alternateStreetIds.length > 0) {
            LOG.debug(`Segment ${segment.id} has alternate street IDs: ${segment.alternateStreetIds}; Show/Hide City Seeding icons.`);
            toggleCitySeedingIcons(!(segment.alternateStreetIds.length > 0));
        } else if (segment.primaryStreetId) {
            // If a segment has its primaryStreetId set and the City is not None, we need to remove City Seeding icons.
            const street = wmeSdk.DataModel.Streets.getById({streetId: segment.primaryStreetId});
            const city = wmeSdk.DataModel.Cities.getById({cityId: street.cityId});
            LOG.debug(`Primary street for segment ${segment.id} has empty or 'None' City?: ${city.isEmpty}`);
            toggleCitySeedingIcons(city.isEmpty);
        } else {
            LOG.debug(`Segment ${segment.id} has no primary street; Show/Hide City Seeding icons.`);
            toggleCitySeedingIcons(true);
        }
    } catch (e) {
        LOG.error(`Error in segmentChangeHandler: ${e}`);
    }
}

async function wmeEditHandler({affectedObjects}) {
    LOG.debug("Edit event detected, checking if icons need to be updated.");
    for (const affectedObject of affectedObjects) {
        if (affectedObject.objectType === FEATURES.segment) {
            await segmentChangeHandler({affectedObject});
        }
    }
}

async function wmeUndoHandler() {
    LOG.debug("Undo event detected, checking if icons need to be updated.");
    const selectedFeatures = wmeSdk.Editing.getSelection();
    if (!selectedFeatures || selectedFeatures.objectType !== FEATURES.segment || !selectedFeatures.ids) {
        LOG.debug("No segment selected after undo, no action required.");
        return;
    }

    const segment = wmeSdk.DataModel.Segments.getById({segmentId: selectedFeatures.ids[0]});
    if (!segment) {
        LOG.warn(`Segment with ID ${selectedFeatures.ids[0]} not found after undo.`);
        return;
    }

    await segmentChangeHandler({affectedObject: {objectType: FEATURES.segment, objectId: segment.id}});
}


// Initialisation
function init() {
    'use strict';

    wmeSdk = getWmeSdk({scriptId: SCRIPT_ID, scriptName: SCRIPT_NAME});

    wmeSdk.Events.once({eventName: "wme-ready"}).then(() => {
        LOG.info("WME is now ready, initialising script...");

        userRank = wmeSdk.State.getUserInfo().rank + 1; // WME ranks are 0-based, but we normalise it here
        userName = wmeSdk.State.getUserInfo().userName;
        userProfileUrl = wmeSdk.DataModel.Users.getUserProfileLink({userName: userName});

        //Loading translations
        localisation()
            .then(injectCss)
            .then(setupActionLocales)
            .then(setupSatImagesLocales)
            .then(loadSettingsTab)
            .then(checkScriptVersion)
            .then(() => LOG.info("WME ready event completed successfully"))
            .catch((error) => LOG.error(`Error during WME ready event: ${error}`));

        if (wmeStdTo !== null) { // Check if it's a PL open
            autoLockClick(); // TODO: Check that this is working as expected, as edit panel and other elements may not be fully loaded yet.
        }
    });

    /*
        NOTE: This event may get triggered twice in succession, if the user changes selection, without de-selecting
        their current selection.
     */
    wmeSdk.Events.on({
        eventName: "wme-selection-changed",
        eventHandler: setupEditPanelActionIcons
    });

    wmeSdk.Events.on({
        eventName: "wme-after-edit",
        eventHandler: wmeEditHandler
    });

    wmeSdk.Events.on({
        eventName: "wme-after-undo",
        eventHandler: wmeUndoHandler
    });
}

unsafeWindow.SDK_INITIALIZED.then(init); // Need unsafeWindow since we have @grants other than none
