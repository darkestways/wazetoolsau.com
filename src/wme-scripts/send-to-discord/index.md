---
layout: script-listing
title: WME Send to Discord (Reloaded)
description: Script to send (Un)lock / Closures / Open / PH / City-Seeding / Sat‑Imagery requests to Discord servers.
author: DarkestWays
install_link: https://wazetoolsau.com/wme-send-to-discord/wme-send-to-discord-reloaded.user.js
icon: /wme-scripts/send-to-discord/images/discord-symbol.svg
---

<div>
<h3 class="text-2xl sm:text-2xl font-medium text-w-grey-900">History</h3>
<p class="text-w-grey-600 mt-4 mb-4">
This script is based on last available version 
<a class="hover:text-w-blue-600 hover:text-shadow-sm" href="https://wms.kbox.at/WME_Send_to_Discord.user.js" target="_blank" referrerpolicy="no-referrer">2024.01.14.01</a> of  
<a class="hover:text-w-blue-600 hover:text-shadow-sm" href="https://www.waze-austria.at/index.php/wme-erweiterungen/wme-send-to-discord" target="_blank" referrerpolicy="no-referrer">WME Send to Discord</a>,
which was itself based on the code from <a class="hover:text-w-blue-600 hover:text-shadow-sm" href="https://github.com/tunisiano187/WME-send-to-slack" target="_blank" referrerpolicy="no-referrer">WME Send to Slack</a>.<br>
</p>
<p class="mt-auto pt-0 text-w-grey-400 text-sm leading-relaxed">Previous Author(s): g1220k, Tunisiano18</p>
</div>

<div>
<h3 class="text-2xl sm:text-2xl font-medium text-w-grey-900">Features</h3>
<p class="text-w-grey-600 mt-4 mb-4">
This script allows editors to send (Un)lock / Closures / Open / PH / City-Seeding / Sat‑Imagery requests to their community's Discord servers, directly from WME.
Requests that require user input for details, a modal is shown for these with appropriate fields. 
For some requests, the script will also show validation errors in the modal if the request is not valid. 
The script will also show a success message if the request is sent successfully.
</p>
</div>

<div>
<h3 class="text-2xl sm:text-2xl font-medium text-w-grey-900">Screenshots</h3>
<p class="text-w-grey-600 mt-4 mb-4">
Here are some screenshots of the script in action.
</p>
<ul class="list-disc list-inside mt-4 mb-4">
    <li class="mb-6"> Lock / Unlock Requests
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 mt-4">
            <div class="grid gap-4">
                <img class="screenshot w-[50%] justify-self-center-safe" src="{{ '/wme-scripts/send-to-discord/images/feat-lock-container-icons.jpg' | relative_url }}" alt="Lock and PH Icons" >
                <img class="screenshot" src="{{ '/wme-scripts/send-to-discord/images/feat-unlock-modal-dark.jpg' | relative_url }}" alt="Unlock Request in modal" >
            </div>
            <div class="grid gap-4">
                <img class="screenshot" src="{{ '/wme-scripts/send-to-discord/images/feat-lock-modal-dark-levels.jpg' | relative_url }}" alt="Lock levels in modal" >
                <img class="screenshot" src="{{ '/wme-scripts/send-to-discord/images/feat-unlock-modal-dark.jpg' | relative_url }}" alt="Un/Lock modal" >
            </div>
            <div class="grid gap-4">
                <img class="screenshot" src="{{ '/wme-scripts/send-to-discord/images/feat-unlock-modal-errors.jpg' | relative_url }}" alt="Un/Lock modal validation errors" >
                <img class="screenshot" src="{{ '/wme-scripts/send-to-discord/images/feat-unlock-modal-dark-filled.jpg' | relative_url }}" alt="Un/Lock modal filled" >
                <img class="screenshot" src="{{ '/wme-scripts/send-to-discord/images/dialog-edit-level-self-check.jpg' | relative_url }}" alt="Dialog Edit Level Self Check" >
            </div>
        </div>
    </li>
    <li class="mb-6"> Closure / Open Requests
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 mt-4">
            <div class="grid gap-4">
                <img class="screenshot w-full" src="{{ '/wme-scripts/send-to-discord/images/feat-closure-open-icons.jpg' | relative_url }}" alt="Closure Open Icons" >
                <img class="screenshot" src="{{ '/wme-scripts/send-to-discord/images/feat-closure-modal-validation-errors-1.jpg' | relative_url }}" alt="Closure validation errors" >
            </div>
            <div class="grid gap-4">
                <img class="screenshot" src="{{ '/wme-scripts/send-to-discord/images/feat-closure-modal-validation-errors-2.jpg' | relative_url }}" alt="Closure validation errors" >
                <img class="screenshot" src="{{ '/wme-scripts/send-to-discord/images/feat-closure-modal-dark-filled.jpg' | relative_url }}" alt="Closure Modal filled" >
            </div>
            <div class="grid gap-4">
                <img class="screenshot" src="{{ '/wme-scripts/send-to-discord/images/feat-open-modal-dark.jpg' | relative_url }}" alt="Open Modal Dark" >
                <img class="screenshot" src="{{ '/wme-scripts/send-to-discord/images/feat-closure-modal-validation-errors-3.jpg' | relative_url }}" alt="Closure validation errors" >
            </div>
        </div>
    </li>
    <li class="mb-6"> Permanent Hazard Requests
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-4 mt-4">
            <div class="grid grid-flow-row-dense gap-4">
                <img class="screenshot justify-self-center-safe" src="{{ '/wme-scripts/send-to-discord/images/feat-ph-alt-icon.jpg' | relative_url }}" alt="Alt Lock and PH Icons" >
                <img class="screenshot" src="{{ '/wme-scripts/send-to-discord/images/feat-ph-level-preview-L2.jpg' | relative_url }}" alt="PH Required Rank L2" >
                <img class="screenshot" src="{{ '/wme-scripts/send-to-discord/images/feat-ph-level-preview-L4.jpg' | relative_url }}" alt="PH Required Rank L4" >
                <img class="screenshot justify-self-center-safe" src="{{ '/wme-scripts/send-to-discord/images/dialog-autozoom-ph.jpg' | relative_url }}" alt="AutoZoom Validation for PH" >
            </div>
            <div class="grid gap-4">
                <img class="screenshot" src="{{ '/wme-scripts/send-to-discord/images/feat-ph-modal-dark.jpg' | relative_url }}" alt="PH Modal Dark" >
            </div>
        </div>
    </li>
    <li class="mb-6"> City Seeding Requests
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-4 mt-4">
            <div class="grid gap-4">
                <img class="screenshot w-full" src="{{ '/wme-scripts/send-to-discord/images/feat-cs-icon-dark.jpg' | relative_url }}" alt="City Seeding Icon Dark" >
                <img class="screenshot w-full" src="{{ '/wme-scripts/send-to-discord/images/feat-cs-icon-light.jpg' | relative_url }}" alt="City Seeding Icon Light" >
            </div>
            <div class="grid gap-4">
                <img class="screenshot col-span-2" src="{{ '/wme-scripts/send-to-discord/images/feat-cs-modal.jpg' | relative_url }}" alt="City Seeding Modal" >
                <img class="screenshot w-full" src="{{ '/wme-scripts/send-to-discord/images/feat-cs-alt-st-no-icon.jpg' | relative_url }}" alt="City Seeding Alt Street no icon" >
                <img class="screenshot w-full" src="{{ '/wme-scripts/send-to-discord/images/feat-cs-discord-message.jpg' | relative_url }}" alt="City Seeding Discord Message" >
            </div>
        </div>
    </li>
    <li class="mb-6"> Satellite Imagery Requests
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 mt-4">
            <div class="grid gap-4">
                <img class="screenshot w-full" src="{{ '/wme-scripts/send-to-discord/images/feat-sat-icon-dark.jpg' | relative_url }}" alt="Satellite Imagery Icon Dark" >
                <img class="screenshot" src="{{ '/wme-scripts/send-to-discord/images/feat-sat-modal-dark.jpg' | relative_url }}" alt="Satellite Imagery Modal Dark" >
            </div>
            <div class="grid gap-4">
                <img class="screenshot" src="{{ '/wme-scripts/send-to-discord/images/feat-sat-modal-dark-preview.jpg' | relative_url }}" alt="Satellite Imagery Modal Dark Preview" >
                <img class="screenshot" src="{{ '/wme-scripts/send-to-discord/images/feat-sat-modal-dark-error-reason.jpg' | relative_url }}" alt="Satellite Imagery Modal Dark Error Reason" >
                <img class="screenshot" src="{{ '/wme-scripts/send-to-discord/images/feat-sat-modal-dark-reason.jpg' | relative_url }}" alt="Satellite Imagery Modal Dark Reason" >
            </div>
            <div class="grid gap-4">
                <img class="screenshot w-full" src="{{ '/wme-scripts/send-to-discord/images/feat-sat-icon-light.jpg' | relative_url }}" alt="Satellite Imagery Icon Light" >
                <img class="screenshot" src="{{ '/wme-scripts/send-to-discord/images/feat-sat-modal-light.jpg' | relative_url }}" alt="Satellite Imagery Modal Light" >
            </div>
        </div>
    </li>
</ul>
</div>
