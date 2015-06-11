/**
 *
 */
'use strict';

var express = require('express'),
    topicsRouter = express.Router(),
    topicsProvider = require('../modules/topics.js');


topicsRouter.get('/list', function (req, res) {
    //Dummy for now
    var _data = [
        {
            'topic_id': 't00_1',
            'topic_heading': 'topic heading 1',
            'topic_description': 'Description 1',
            'topic_eligibility': 'List of eligibility criteria',
            'topic_contacts_email': 'email1@email.com',
            'topic_contacts_phone': 'xxxxxxxxx',
            'topic_tags': '#t1, #t2'
        },
        {
            'topic_id': 't00_2',
            'topic_heading': 'topic heading 2',
            'topic_description': 'Description 2',
            'topic_eligibility': 'List of eligibility criteria',
            'topic_contacts_email': 'email1@email.com',
            'topic_contacts_phone': 'xxxxxxxxx',
            'topic_tags': '#t1, #t2'
        },
        {
            'topic_id': 't00_3',
            'topic_heading': 'topic heading 1',
            'topic_description': 'Description 1',
            'topic_eligibility': 'List of eligibility criteria',
            'topic_contacts_email': 'email1@email.com',
            'topic_contacts_phone': 'xxxxxxxxx',
            'topic_tags': '#t1, #t2'
        }
    ];

    res.json(_data);
});

module.exports = topicsRouter;