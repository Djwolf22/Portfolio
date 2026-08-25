// Add a new project by adding one object to this array — no HTML editing needed.
// "bullets" and "tech" are optional; leave "tech" as an empty string to hide that line.
var PROJECTS = [
    {
        title: "Endpoint Deployment Case Study",
        description: "Investigated an unauthorized program deployed across every machine in the SOC, tracing it from initial detection to the exact account responsible.",
        bullets: [
        "Traced the file's deployment path to a shared SCCM location to determine how it reached multiple machines at once.",
        "Reviewed the SCCM access control list and cross-referenced it with Active Directory to narrow down responsible accounts.",
        "Built a complete case narrative from detection through resolution."
        ],
        tech: "Skills: File path analysis, SCCM, Active Directory, access control review, incident investigation",
        link: "Endpoint-Deployment-Case-Study.html",
        image: "assets/images/goose.png",
        ctaLabel: "Read full case study"
    },
    {
        title: "RowdyHacksX: Evil Twin Attack",
        description: "Led a Cyber and CS student team that built a controlled Evil Twin Attack demo using a Raspberry Pi and a PHP-powered captive portal.",
        bullets: [
            "Demonstrated wireless network risks in a controlled awareness setting.",
            "Built a captive portal to collect test credentials for training purposes.",
            "Explained Wi-Fi security weaknesses to participants."
        ],
        tech: "Skills: Raspberry Pi, PHP, wireless security, awareness training",
        link: "https://devpost.com/software/evil-twin-attack",
        image: "assets/images/rowdyhacksx-evil-twin.png"
    },
    {
                title: "Home Network Pi-hole",
        description: "Set up a Raspberry Pi running Pi-hole to block ads and trackers network-wide at the DNS level.",
        bullets: [
            "Configured Pi-hole as the primary DNS resolver for the home network to filter ad and tracker domains before they reach any device.",
            "Used the built-in dashboard to monitor query logs and block rates across the network."
        ],
        tech: "Skills: Raspberry Pi, Pi-hole, DNS filtering, Linux",
        image: "assets/images/pi-hole.png"

    }

    // --- To add a new project, copy the block below, fill it in, and add a comma above ---
    // {
    //     title: "New Project Title",
    //     description: "One or two sentences describing what it was and why it mattered.",
    //     bullets: [
    //         "First key detail or outcome.",
    //         "Second key detail or outcome."
    //     ],
    //     tech: "Skills: tool one, tool two, tool three"
    // }
];
