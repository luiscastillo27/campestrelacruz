<?php
return [
    'settings' => [
        'displayErrorDetails' => true,

        // Renderer settings
        'renderer' => [
            'template_path' => __DIR__ . '/../templates/',
        ],

        // Monolog settings
        'logger' => [
            'name' => 'slim-app',
            'path' => __DIR__ . '/../logs/app.log',
        ],
        
        'app_token_name'   => 'APP-TOKEN',
        
        'connectionString' => [
            'dns'  => 'mysql:host=localhost;dbname=terreno;charset=utf8',
            'user' => 'root',
            'pass' => 'admin'
        ]

        // 'connectionString' => [
        //     'dns'  => 'mysql:host=desarrollocampestrelacruz.net.mysql;dbname=desarrollocampestrelacruz_net;charset=utf8',
        //     'user' => 'desarrollocampestrelacruz_net',
        //     'pass' => 'QwGAadhzvHYkGTNxgz5zDPV6'
        // ]
    ],
];
