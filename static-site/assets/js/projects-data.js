// Add a new project by adding one object to this array — no HTML editing needed.
// "bullets" and "tech" are optional; leave "tech" as an empty string to hide that line.
var PROJECTS = [
    {
        title: "Desktop Malware Analysis",
        description: "Reverse-engineered mock malware deployed through endpoint management tools and traced infection paths through system and network logs.",
        bullets: [
            "Identified the simulated insider threat.",
            "Mapped activity through endpoint and network evidence.",
            "Updated SOC playbooks to improve incident response."
        ],
        tech: "Skills: Malware analysis, log review, incident response, playbook improvement",
        link: "malware-analysis.html",
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
