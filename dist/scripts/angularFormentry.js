(function() {
  'use strict';

  angular
    .module('app.developerDemo', [

    ])
    .config(function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
      $stateProvider
        .state('developer-demo', {
          url: '/developer-demo',
          controller: "SimpleDemoCtrl",
          templateUrl: 'views/developer-demo/demo-form.html',
          data: {
            requireLogin: true
          }
        });
    });
})();

String.prototype.endsWith = function(suffix) {
  return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

/*jscs:disable disallowMixedSpacesAndTabs, requireDotNotation, requirePaddingNewLinesBeforeLineComments, requireTrailingComma*/
(function() {
  'use strict';

  angular
        .module('openmrs.RestServices', [
            'ngResource',
            'openmrs-ngresource.models',
            'openmrs-ngresource.restServices'
        ]);
})();

(function() {
  'use strict';

  angular
    .module('app.formDesigner', [

    ])
    .config(function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
      $stateProvider
        .state('form-designer', {
          url: '/form-designer',
          controller: "FormDesignerCtrl",
          templateUrl: 'views/form-designer/form-designer.html',
          data: {
            requireLogin: true
          }
        });
    });
})();

/*
jshint -W098, -W003, -W068, -W004, -W033, -W030, -W117, -W069, -W106
*/
/*
jscs:disable disallowMixedSpacesAndTabs, requireDotNotation, requirePaddingNewLinesBeforeLineComments, requireTrailingComma
*/
(function() {
  'use strict';

  angular
        .module('openmrs.angularFormentry', [
          'ngMessages',
          'ngResource',
          'formly',
          'formlyBootstrap',
          'ui.bootstrap',
          'openmrs.RestServices',
          'ui.bootstrap.datetimepicker',
          'ui.select',
          'ngSanitize',
          'angularMoment',
          'kendo.directives'
        ])

        .run(function(formlyConfig, formlyValidationMessages, formlyApiCheck) {
      formlyConfig.extras.errorExistsAndShouldBeVisibleExpression = 'fc.$touched || form.$submitted';
      formlyValidationMessages.addStringMessage('required', 'This field is required');
      formlyValidationMessages.addTemplateOptionValueMessage('max', 'max', 'The max value allowed is ', '', 'Too Big');
      formlyValidationMessages.addTemplateOptionValueMessage('min', 'min', 'The min value allowed is ', '', 'Too Small');
      formlyConfig.extras.removeChromeAutoComplete = true;

      formlyConfig.setType({
          name: 'customInput',
          extends: 'input',
          apiCheck: function() {
            formlyApiCheck.shape({
              foo: formlyApiCheck.string.optional
            });
          }
        });

      formlyConfig.setType({
          name: 'section',
          extends: 'input',
          apiCheck: function() {
            formlyApiCheck.shape({
              foo: formlyApiCheck.string.optional
            });
          }
        });

      formlyConfig.setWrapper({
          name: 'validation',
          types: ['input', 'customInput','datepicker', 'select', 'section', 'multiCheckbox', 'select-concept-answers'],
          templateUrl: 'error-messages.html'
        });
    });
})();

(function() {
  'use strict';

  angular
    .module('app.openmrsFormManager', [
      'openmrs.RestServices'
    ])
    .run(function(formlyConfig) {
      formlyConfig.setType({
        name:'aceJsonEditor',
        template: '<div ui-ace="{'
                      + 'mode: \'json\''
                    +'}" ng-model="model[options.key]"></div>'
      });
      
      formlyConfig.setType({
        name: 'fileUpload',
        template: '<input type="file" file-model="model[options.key]"/>'
      });
    });
})();

/*
jshint -W098, -W003, -W068, -W004, -W033, -W030, -W117, -W069, -W106
*/
/*jscs:disable disallowMixedSpacesAndTabs, requireDotNotation, requirePaddingNewLinesBeforeLineComments, requireTrailingComma*/
'use strict';

/**
 * @ngdoc overview
 * @name angularFormentryApp
 * @description
 * # angularFormentryApp
 *
 * Main module of the application.
 */
angular
  .module('angularFormentry', [
    'ngAnimate',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ngResource',
    'openmrs-ngresource.models',
    'openmrs-ngresource.restServices',
    'openmrs.angularFormentry',
    'ui.ace',
    'openmrs.RestServices',
    'app.openmrsFormManager',
    'app.formDesigner',
    'app.developerDemo',
    'ui.bootstrap',
    'dialogs.main',
    'pascalprecht.translate'
  ])
  .config(function ($provide) {
    $provide.decorator('$q', function ($delegate) {
      function allSettled(promises) {
        var deferred = $delegate.defer(),
          counter = 0,
          results = angular.isArray(promises) ? [] : {};

        angular.forEach(promises, function (promise, key) {
          counter++;
          $delegate.when(promise).then(function (value) {
            if (results.hasOwnProperty(key)) return;
            results[key] = { status: "fulfilled", value: value };
            if (!(--counter)) deferred.resolve(results);
          }, function (reason) {
            if (results.hasOwnProperty(key)) return;
            results[key] = { status: "rejected", reason: reason };
            if (!(--counter)) deferred.resolve(results);
          });
        });

        if (counter === 0) {
          deferred.resolve(results);
        }

        return deferred.promise;
      }
      $delegate.allSettled = allSettled;
      return $delegate;
    });
  })
  .config(function($stateProvider, $translateProvider, dialogsProvider) {
    dialogsProvider.useBackdrop('static');
    dialogsProvider.useEscClose(false);
    dialogsProvider.useCopy(false);
    dialogsProvider.setSize('sm');

    $translateProvider.translations('en-US', {
        DIALOGS_ERROR: 'Error',
        DIALOGS_OK: 'Ok',
        DIALOGS_YES: 'Yes',
        DIALOGS_NO: 'No',
        DIALOGS_CLOSE: 'Close'
    });

    $translateProvider.preferredLanguage('en-US');
    
    $stateProvider
        .state('form-management', {
          url: '/',
          templateUrl: 'views/openmrs-form-manager/openmrs-form-manager.htm',
          controller: 'OpenmrsFormManagerCtrl'
        })
        .state('about', {
          url: '/about',
          templateUrl: 'views/about.html',
          controller: 'AboutCtrl'
        })
        .state('recursive-test', {
          url: '/recursive-test',
          templateUrl: 'views/form-editor.html',
          controller: 'EditorCtrl'
        })
        .state('form-create', {
          url: '/form/create',
          templateUrl: 'views/openmrs-form-manager/create-form.htm',
          controller: 'CreateFormCtrl'
        })
        .state('form-view', {
          url: '/form/view/:formUuid',
          templateUrl: 'views/openmrs-form-manager/view-form.htm',
          controller: 'ViewEditFormCtrl'
        })
        .state('form-edit', {
          url: '/form/edit/:formUuid',
          templateUrl: 'views/openmrs-form-manager/edit-form.htm',
          controller: 'ViewEditFormCtrl'
        });
  });

/*
 jshint -W098, -W003, -W068, -W004, -W033, -W030, -W117, -W069, -W106, -W026
 */
/*
 jscs:disable disallowMixedSpacesAndTabs, requireDotNotation, requirePaddingNewLinesBeforeLineComments, requireTrailingComma
 */


/*
 algorithm for populating model with existing data:
 1. the result from openmrs provides a concept uuid. therefore, the concept uuid should be used to create the key.
 2. look for all keys in the model that "contain" the uuid. we must assume there is no order to questions on the same level. so if a question twice, we fill the answer with the first empty field. We determine if a field is not-empty by the presence of an "initialValue" property in the field.data array which is not undefined.
 3. if empty, set field.data.initialValue.
 4. If non-empty, keep looking for another a question.
 5. If the question is a repeating_field, then add the answer to the array modeling that repeating field. This means that a form should only have a single repeating field on the same schema "level" as it's not possible to know if the nth obs in an existing encounter belongs to either a repeating element or another question with the same uuid.
 6.
 */
(function() {
  'use strict';



  angular
    .module('openmrs.angularFormentry')
    .factory('TestService', TestService);

  TestService.$inject = ['$log'];

  function TestService($log) {
    var _ = window._;
    var service = {
      "getCompiledForm" : getCompiledForm,
      "toFormlySections": toFormlySections
    };


    /*
     algorithm for populating model with existing data:
     1. the result from openmrs provides a concept uuid. therefore, the concept uuid should be used to create the key.
     2. look for all keys in the model that "contain" the uuid. we must assume there is no order to questions on the same level. so if a question twice, we fill the answer with the first empty field. We determine if a field is not-empty by the presence of an "initialValue" property in the field.data array which is not undefined.
     3. if empty, set field.data.initialValue.
     4. If non-empty, keep looking for another a question.
     5. If the question is a repeating_field, then add the answer to the array modeling that repeating field. This means that a form should only have a single repeating field on the same schema "level" as it's not possible to know if the nth obs in an existing encounter belongs to either a repeating element or another question with the same uuid.
     6.
     */


    service.schema =
    {
      name:"",
      uuid:"",
      processor:"",
      "pages": [
        {
          "label": "Encounter Details",
          "sections": [
            {
              "label": "Encounter Details",

              "questions": [
                {
                  "concept": "a8b02524-1350-11df-a1f1-0026b9348838",
                  "label": "Patient covered by NHIF:",
                  "modelType":"obsType",
                  "type": "select",
                  "questionOptions":{
                    "repeating":true
                  },
                  "answers": [
                    {
                      "concept": "8b715fed-97f6-4e38-8f6a-c167a42f8923",
                      "label": "Yes"
                    },
                    {
                      "concept": "a899e0ac-1350-11df-a1f1-0026b9348838",
                      "label": "No"
                    }
                  ],
                  "validators": []
                },
                {
                  "concept": "a89ff9a6-1350-11df-a1f1-0026b9348838",
                  "modelType":"obsType",
                  "label": "Was this visit scheduled?",
                  "id": "scheduledVisit",
                  "answers": [
                    {
                      "concept": "a89b6440-1350-11df-a1f1-0026b9348838",
                      "label": "Scheduled visit"
                    },
                    {
                      "concept": "a89ff816-1350-11df-a1f1-0026b9348838",
                      "label": "Unscheduled Visit Early"
                    },
                    {
                      "concept": "a89ff8de-1350-11df-a1f1-0026b9348838",
                      "label": "Unscheduled Visit Late"
                    }
                  ],
                  "type": "select",
                  "validators": []
                },
                {
                  "modelType":"obsType",
                  "concept": "dc1942b2-5e50-4adc-949d-ad6c905f054e",
                  "label": "If Unscheduled, actual scheduled date",
                  "id": "q7b",
                  "type": "date",
                  "validators": [
                    {
                      "type": "date",
                      "allowFutureDates": "true"
                    },
                    {
                      "type": "js_expression",
                      "failsWhenExpression": "!isEmpty(scheduledVisit) && arrayContains(['a89ff816-1350-11df-a1f1-0026b9348838','a89ff8de-1350-11df-a1f1-0026b9348838'], scheduledVisit) && isEmpty(myValue)",
                      "message": "Patient visit marked as unscheduled. Please provide the scheduled date."
                    },
                    {
                      "type": "conditionalRequired",
                      "message": "Patient visit marked as unscheduled. Please provide the scheduled date.",
                      "referenceQuestionId": "scheduledVisit",
                      "referenceQuestionAnswers": [
                        "a89ff816-1350-11df-a1f1-0026b9348838",
                        "a89ff8de-1350-11df-a1f1-0026b9348838"
                      ]
                    }
                  ],
                  "disableExpression": [
                    {
                      "disableWhenExpression": "!arrayContains(['a89ff816-1350-11df-a1f1-0026b9348838','a89ff8de-1350-11df-a1f1-0026b9348838'], scheduledVisit)"
                    }
                  ]
                },
                {
                  "modelType":"obsType",
                  "concept": "a8a003a6-1350-11df-a1f1-0026b9348838",
                  "type": "group_repeating",
                  "label": "Was patient hospitalized?",
                  "questionOptions": {
                    "repeating":true
                  },
                  "questions": [
                    {
                      "modelType":"obsType",
                      "concept": "a8a07a48-1350-11df-a1f1-0026b9348838",
                      "label": "Reason for hospitalization",
                      "type": "problem",
                      "id":"hospitalizationReason",
                      "validators": [
                        {
                          "type": "conditionalAnswered",
                          "message": "Providing diagnosis but didn't answer that patient was hospitalized in question 11a",
                          "referenceQuestionId": "wasHospitalized",
                          "referenceQuestionAnswers": [
                            "a899b35c-1350-11df-a1f1-0026b9348838"
                          ]
                        }
                      ]
                    },
                    {
                      "modelType":"obsType",
                      "concept":"made-up-concept",
                      "label": "Date of hospitalization",
                      "type":"input",
                      "questions": [
                        {
                          "modelType":"obsType",
                          "concept":"made-up-concept-2",
                          "label": "Start Date",
                          "type":"input"
                        },
                        {
                          "modelType":"obsType",
                          "concept":"made-up-concept-3",
                          "label": "End Date",
                          "type":"input"
                        }

                      ]
                    }
                  ]
                }

              ]
            },
            {
              "label":"Test Section",
              "questions": [
                {
                  "modelType": "obsType",
                  "concept": "a8a003a6-1350-11df-a1f1-0026b9348838",
                  "type": "group_repeating",
                  "label": "Was patient hospitalized?",
                  "questions": [
                    {
                      "modelType": "obsType",
                      "concept": "a8a07a48-1350-11df-a1f1-0026b9348838",
                      "label": "Reason for hospitalization",
                      "type": "problem",
                      "id": "hospitalizationReason",
                      "validators": [
                        {
                          "type": "conditionalAnswered",
                          "message": "Providing diagnosis but didn't answer that patient was hospitalized in question 11a",
                          "referenceQuestionId": "wasHospitalized",
                          "referenceQuestionAnswers": [
                            "a899b35c-1350-11df-a1f1-0026b9348838"
                          ]
                        }
                      ]
                    },
                    {
                      "modelType": "obsType",
                      "concept": "made-up-concept",
                      "label": "Date of hospitalization",
                      "type": "input",
                      "questions": [
                        {
                          "modelType": "obsType",
                          "concept": "made-up-concept-2",
                          "label": "Start Date",
                          "type": "input"
                        },
                        {
                          "modelType": "obsType",
                          "concept": "made-up-concept-3",
                          "label": "End Date",
                          "type": "input"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };

    var modelType = {
      createFormlyField: function(schemaQuestion) {
      },
      setModelValue: function(model,schemaQuestion) {},
      getModelValue: function(model,schemaQuestion) {}
    };


    /*
     schema rules
     0. A question can on be asked once on a common level of a particular branch. In other words, you can not ask, "Are you on ARVs?" in more than one place on the form unless the question is nested within another question (and that question does not already ask the question).
     1. A question can be asked have multiple answers only if it is of an appropriate type, e.g. "group_repeating", "multi-checkbox"
     2. A question can have unlimited levels of nested questions.
     */


    var modelTypes = {
      "obsType":obsTypeToFormlyField
    };


//each uuid only allowed to occur once per level.
//for convenience, make each key point to an array. if the schema allows, this will have multiple objects, or just one if not allowed to //repeat.
    function obsTypeToFormlyField(question,model) {
      var key = 'value';
      var field = {key:key};
//      var m = {concept:question.concept,schemaQuestion: question, formlyField:field,value:""};
      var m = {concept:question.concept,schemaQuestion: question, value:""};
//      var m = {concept:question.concept,value:""};
      field.templateOptions = {
        type: 'text',
        label: question.label,
      };

      if("questions" in question) {
        m.obsGroup = {};
        field.type = "section";
        field.data = {"recursiveModel":m.obsGroup};
      }
      else {
        field.type = "input"; //TEMPORARY: This needs to reflect the actual type
      }
      if(question.concept in model) { //add m to the array
        model[question.concept].push(m);
      }
      else { //create array with just m
        model[question.concept] = [m];
      }

      field.model = m;
      return field;
    }


    function questionsToFormlyFields(questions,fields,model,questionMap) {
      for(var i in questions) {
        var question = questions[i];
        var modelType = question.modelType;

        //Not the best solution but a quick attempt to generalize how to get a type and produce a field
        var field = modelTypes[modelType](question,model);

        if("id" in question) {
          if(question.id in questionMap) {
            questionMap[question.id].push(field);
          }
          else {
            questionMap[question.id] = [field];
          }

        }

        fields.push(field);
        if("questions" in question) {
          //if(fields.data === undefined) field.data = {"fields":[]};
          field.data.fields = [];
          questionsToFormlyFields(question.questions,field.data.fields,field.data.recursiveModel,questionMap);
        }


      };
      return fields;

    }

    /*
     This function allows you to clone a question schema and insert it into the fields array
     at a specific index.
     index: the location in the fields array at which point this field is to be inserted
     question : the json schema of this particular question
     fields : the array of formly fields into which this new field will be inserted
     model : this model maps to the same level as fields. In other words, it should be the
             the model which contains the models for each of the fields. More specifically
             it is NOT the model for a specific field.
     questionMap : a hash linking user specified id's (from the schema) to formly fields
     */
    function insertIntoFormlyFields(index,question,fields,model,questionMap) {

      if(index === undefined || index === null) index = fields.length - 1;

      var modelType = question.modelType;
      //Not the best solution but a quick attempt to generalize how to get a type and produce a formly field
      var field = modelTypes[modelType](question, model);

      if("id" in question) {
        if(question.id in questionMap) {
          questionMap[question.id].push(field);
        }
        else {
          questionMap[question.id] = [field];
        }

      }


      var front = _.slice(fields,0,index);
      var back = _.slice(fields,index);

      front.push(field);
      _.remove(fields); //this strategy used to maintain reference of fields array.
      Array.prototype.push.apply(fields,front);

      if ("questions" in question) {
        //the last model will be the one just created
        var nestedFields = [];
        field.data.fields = [];
        //questionsToFormlyFields(question.questions, nestedFields, field.data.recursiveModel, questionMap);
        questionsToFormlyFields(question.questions, field.data.fields, field.data.recursiveModel, questionMap);
        //Array.prototype.push.apply(fields,nestedFields);
      }
      Array.prototype.push.apply(fields,back);
    }


    function schemaToFormlyForm(schema) {
      var compiledSchema = [];
      var questionMap = {};

      _.each(schema.pages,function(page) {
        var compiledPage = [];
        _.each(page.sections,function(section) {
          var sectionModel = {};
          var fields = [];
          questionsToFormlyFields(section.questions,fields,sectionModel,questionMap);
          compiledPage.push({section:section,formlyFields:fields,sectionModel:sectionModel});
        });
        compiledSchema.push({page:page,compiledPage:compiledPage});
      });

      return {compiledSchema:compiledSchema,questionMap:questionMap};
    }


//uses question.type to determine if this can be asked more than once.
    function allowsRepeating(question) {
      return (question.questionOptions !== undefined && question.questionOptions.repeating);
    }



//obs payload
    var obsRestPayload =
      [
        {concept:"a8b02524-1350-11df-a1f1-0026b9348838",value:"value1",obsId:"1"},
        {concept:"a8a003a6-1350-11df-a1f1-0026b9348838",obsId:"2","obsGroup": [{obsId:"3","concept":"a8a07a48-1350-11df-a1f1-0026b9348838","value":"value3"}]}
      ];

    var obsRestPayloadRepeatingObs =
      [
        {concept:"a8b02524-1350-11df-a1f1-0026b9348838",value:"value1",obsId:"1"},
        {concept:"a8b02524-1350-11df-a1f1-0026b9348838",value:"a repeat",obsId:"5"},
        {concept:"a8a003a6-1350-11df-a1f1-0026b9348838",obsId:"2","obsGroup": [{obsId:"3","concept":"a8a07a48-1350-11df-a1f1-0026b9348838","value":"value3"}]}
      ];

    var obsRestPayloadRepeatingObsGroup =
      [
        {concept:"a8b02524-1350-11df-a1f1-0026b9348838",value:"value1",obsId:"1"},
        {concept:"a8b02524-1350-11df-a1f1-0026b9348838",value:"a repeat",obsId:"5"},
        {concept:"a8a003a6-1350-11df-a1f1-0026b9348838",obsId:"2",
          "obsGroup": [
            {obsId:"3","concept":"a8a07a48-1350-11df-a1f1-0026b9348838","value":"value3"},
            {obsId:"53","concept":"a8a07a48-1350-11df-a1f1-0026b9348838","value":"hello erick"}
          ]
        },
        {concept:"a8a003a6-1350-11df-a1f1-0026b9348838",obsId:"10","obsGroup": [{obsId:"11","concept":"a8a07a48-1350-11df-a1f1-0026b9348838","value":"value43"}]}
      ];

    service.payload = obsRestPayloadRepeatingObsGroup;

    function isEmpty(value) {
      return (value === null || value === undefined || value === "");
    }

    function getFormlyFieldByModelKey(key,value,formlyFields,mustBeEmpty) {
      var field,f;
      var index = 0;
      for(var i=0; i< formlyFields.length;i++) {
        f = formlyFields[i];

        if(f.model[key] === value) {
          if ((mustBeEmpty && isEmpty(f.model.initialValue)) || mustBeEmpty === false) {
            field = f;
            index = i;
          }
        }
      }
      return {"field":field,"index":index};
    }


//A question may only be asked once per section. It may be allowed to have multiple answers.
//This means that we can use the concept uuid as the key and in the model, use an array to hold multiple answers.
//OpenMRS does not support ordering to the way these questions are answered. i.e. if there are multiple obs with the same concept,
//you can not know by looking at the database the order of these obs's.
//returns true if found and populated


    function addObsToFormlyField(obs,field,questionMap) {
      field.model.value = obs.value;
      field.model.obsId = obs.obsId;
      field.model.initialValue = obs.value;
      _.each(obs.obsGroup,function(o) {
        addObsToSection(o,field.data.fields,field.model.obsGroup,questionMap);
      });
    }


    function addObsToSection(o,formlyFields,sectionModel,questionMap) {
      var field;
      var questionModel = sectionModel[o.concept];
      var schemaQuestion = questionModel[0].schemaQuestion;

      if(questionModel[0].obsId === undefined ) {
        field = getFormlyFieldByModelKey("concept",o.concept,formlyFields,true).field;
      }
      else if(allowsRepeating(schemaQuestion)) {
        var index = 1 + getFormlyFieldByModelKey("concept", o.concept,formlyFields,true).index;
        insertIntoFormlyFields(index,schemaQuestion,formlyFields,sectionModel,questionMap);
        field = formlyFields[index];
      }

      //console.log("found field:",field);
      if(field) {
        addObsToFormlyField(o, field, questionMap);
        return true;
      }
      else {
        $log.debug("NO FIELD FOUND FOR OBS: ",o);
        return false;
      }
    }


    function addExistingObsSetToForm(form,restObs) {
      var found,pageResult,sectionResult,curPage, curSection,page, section;
      _.each(restObs,function(o) {
        found = false;
        curPage = 0;
        while (!found && curPage < form.compiledSchema.length) {
          page = form.compiledSchema[curPage];
          curSection = 0;
          while (!found && curSection < page.compiledPage.length) {
            section = page.compiledPage[curSection];
            _.find(section.sectionModel, function (questionModel) {
              if (o.concept === questionModel[0].concept) {
                found = addObsToSection(o, section.formlyFields, section.sectionModel, form.questionMap);
              }
              return found;
            });
            curSection += 1;
          }
          curPage += 1
        }
      });
    }

    function toFormlySections(compiledPage) {
      var fields = [];
      var field;
      _.each(compiledPage,function(section){
        field = {
          key: section.section.label,
          type: 'section',
          templateOptions: {
            label: section.section.label
          },
          data: {fields: section.formlyFields}
        };

        fields.push(field);
      });
      return fields;

    }

    function getCompiledForm(schema,payload) {
      if(schema) this.schema = schema;
      if(payload) this.payload = payload;
      var form = schemaToFormlyForm(this.schema);
      // console.log(payload);
      // addExistingObsSetToForm(form,this.payload);

      console.log(form);
      window.form = form;
      return form;
    }


    return service;
  }
})();

/*
jshint -W098, -W003, -W068, -W004, -W033, -W030, -W117, -W069, -W106, -W026
jscs:disable disallowMixedSpacesAndTabs, requireDotNotation 
jscs:requirePaddingNewLinesBeforeLineComments, requireTrailingComma
*/
(function() {
    'use strict';

    angular
        .module('openmrs.angularFormentry')
        .factory('FormEntry', FormEntry);

    FormEntry.$inject = ['CreateFormService', '$log', 'FormentryConfig',
        'FormProcessorService', 'CurrentLoadedFormService', 'moment',
        'FormSchemaCompilerService'
    ];

    function FormEntry(createFormService, $log, FormentryConfig,
        formProcessorService, CurrentLoadedFormService, moment,
        FormSchemaCompilerService) {

        var service = {
            createForm: createForm,
            registerCustomFieldHandler: registerCustomFieldHandler,
            getFormPayload: getFormPayload,
            updateFormWithExistingObs: updateFormWithExistingObs,
            getPersonAttributesPayload: getPersonAttributesPayload,
            updateExistingPersonAttributeToForm: updateExistingPersonAttributeToForm,
            compileFormSchema: compileFormSchema
        };

        return service;

        function registerCustomFieldHandler(_handlerName, _handlerMethod) {
            if (typeof _handlerMethod === 'function') {
                FormentryConfig
                    .registerFieldHandler(_handlerName, _handlerMethod);
            } else {
                $log.info('Handler was not registered!!');
            }
        }

        function createForm(schema, model) {
            var formObject = createFormService.createForm(schema, model);
            CurrentLoadedFormService.formModel = model;
            CurrentLoadedFormService.questionMap = formObject.questionMap;

            return formObject;
        }

        function getFormPayload(model) {
            return formProcessorService.encounterFormProcessor(model);
        }

        function getPersonAttributesPayload(model) {
            return formProcessorService.personAttributeFormProccesor(model);
        }

        function updateFormWithExistingObs(model, restObs) {
            formProcessorService.addExistingDataSetToObsForm(restObs, model);
            formProcessorService.addExistingDataSetToEncounterForm(restObs, model);
        }

        function updateExistingPersonAttributeToForm(restDataset, model) {
            return formProcessorService.addExistingPersonAttributesToForm(restDataset, model);
        }

        function compileFormSchema(formSchema, referencedForms) {
            FormSchemaCompilerService.
                fillAllPlaceholderObjectsInForm(formSchema, referencedForms);
        }
    }
})();

/*
jshint -W098, -W003, -W068, -W004, -W033, -W030, -W117, -W069, -W106, -W026
jscs:disable disallowMixedSpacesAndTabs, requireDotNotation
jscs:requirePaddingNewLinesBeforeLineComments, requireTrailingComma
*/
(function () {
    'use strict';

    angular
        .module('openmrs.angularFormentry')
        .factory('CreateFormService', CreateFormService);

    CreateFormService.$inject = ['$log', 'OpenmrsFieldHandlerService',
    'HistoricalFieldHelperService', 'schemaValidatorService'];

    function CreateFormService($log, OpenmrsFieldHandler,
      HistoricalFieldHelperService, schemaValidatorService) {
        var gId = 0;
        var orderCounter = 0;
        var service = {
            createForm: createForm
        };

        return service;

        function createForm(schema, model) {
            var form;
            var _errors = schemaValidatorService.validateSchema(schema);

            if (_errors.pass === false) {
              $log.error('Your form Schema has errors');
            }
            form = _createFormlyForm(schema);
            $log.debug('inspect compiled', form);
            var formlyForm = _createModel(form, model);
            form.questionMap.model = model;
            return {
                formlyForm: formlyForm,
                questionMap: form.questionMap,
                error:_errors.errors
            };
        }

        function _createSectionId(seectionName) {
            return seectionName.replace(/ /gi, '_') ;
        }

        function _createFormlyForm(schema) {
            var compiledSchema = [];
            var questionMap = {};
            var pageFields = [];

            _.each(schema.pages, function (page) {
                var compiledPage = [];
                _.each(page.sections, function (section) {
                    var sectionModel = {};
                    var fields = [];
                    var sectionId;
                    _createFieldsFactory(section.questions, fields, sectionModel, questionMap);
                    sectionId = _createSectionId(section.label);
                    $log.debug('Secion ID: ', sectionId);
                    var sectionField = {
                        key: 'section_' + sectionId,
                        type: 'section',
                        templateOptions: {
                            label: section.label,
                            expanded: section.isExpanded
                        },
                        data: {
                            fields: fields
                        }
                    };
                    // model['section_' + sectionId] = sectionModel;
                    pageFields.push(sectionField);
                    compiledPage.push({
                        section: section,
                        formlyFields: sectionField,
                        sectionModel: sectionModel
                    });
                });

                compiledSchema.push({
                    page: page,
                    compiledPage: compiledPage
                });
            });

            return ({
                compiledSchema: compiledSchema,
                questionMap: questionMap
            });
        }

        function _createModel(form, model) {
            var tabs = [];
            _.each(form.compiledSchema, function (page) {
                tabs.push({
                    title: page.page.label,
                    form: {
                        options: {},
                        model: model,
                        fields: _generateFormlySections(page.compiledPage)
                    }
                });

                _.each(page.compiledPage, function (section) {
                    var sectionId = _createSectionId(section.section.label);
                    model['section_' + sectionId] = section.sectionModel;
                });
            });

            return tabs;
        }

        function _generateFormlySections(compiledPage) {
            var fields = [];
            var field;
            _.each(compiledPage, function (section) {
                fields.push(section.formlyFields);
            });

            return fields;
        }

        //Add form information to Model
        function __addFormInfoToModel(schema, model) {
            model.form_info = {
                name: schema.name,
                version: schema.version
            };

            if (schema.encounterType) {
                model.form_info.encounterType = schema.encounterType;
            }

            if (schema.form) {
                model.form_info.form = schema.form;
            }
        }

        function _createFieldsFactory(questions, fields, model, questionMap) {
            for (var i in questions) {
                var question = questions[i];
                var handlerName;
                var handlerMethod;
                var modelType = question.type;

                if(question.id === 'current_art_regimen') {
                    var a = 'me';
                }

                if (question.type === undefined)
                {
                  //Apperently during tests there is a function that is being
                  // added to the list of questions in a section.
                  // This will also nsute that questions without type are skipped
                  $log.error('question Missing Question Type:', question);
                  console.log('question Missing Question Type:', question);
                } else if (question.type === 'obs') {
                    handlerMethod = OpenmrsFieldHandler.getFieldHandler('obsFieldHandler');
                    // $log.debug('about to create: ', question);
                    var field = handlerMethod(question, model, questionMap);
                    // $log.debug('Field Created', field);
                    if (angular.isArray(field)) {
                        _.each(field, function (f) {
                            fields.push(OpenmrsFieldHandler.createAnchorField(f.key));
                            fields.push(f);
                            if (f.templateOptions.historicalExpression) {
                                fields.push(HistoricalFieldHelperService.
                                    createHistoricalTextField(f, model, f.key, question.historicalPrepopulate));
                            }
                        });
                    } else {
                        fields.push(OpenmrsFieldHandler.createAnchorField(field.key));
                        fields.push(field);
                        if (field.templateOptions.historicalExpression) {
                            fields.push(HistoricalFieldHelperService.
                                createHistoricalTextField(field, model, field.key, question.historicalPrepopulate));
                        }
                    }

                } else if (question.type === 'obsGroup') {
                    var fieldsArray = [];
                    // model.obsGroup;
                    // model['obsGroup' + '_' + question.label] = {};
                    var groupModel;
                    var obsField = {};
                    var groupId = _createSectionId(question.label);
                    if (question.questionOptions.rendering === 'group') {
                        model['obsGroup' + '_' + groupId] = {};
                        groupModel = model['obsGroup' + '_' + groupId];
                        groupModel.groupConcept = question.questionOptions.concept;
                        obsField = {
                            className: 'row',
                            key: 'obsGroup' + '_' + groupId,
                            fieldGroup: fieldsArray,
                            data: {
                                concept: question.questionOptions.concept
                            },
                        };
                        _createFieldsFactory(question.questions, fieldsArray,
                            groupModel, questionMap);

                        if (obsField['templateOptions'] === undefined) {
                            obsField['templateOptions'] = {};
                        }

                        HistoricalFieldHelperService.
                            handleModelBluePrintFunctionForGroupsProperty(obsField, question);

                        HistoricalFieldHelperService.
                            handleGetDisplayValueFunctionForGroupsProperty(obsField, question);

                        fields.push(OpenmrsFieldHandler.createAnchorField(obsField.key));
                        fields.push(obsField);
                    } else if (question.questionOptions.rendering === 'repeating') {
                        gId = gId + 1;
                        var repeatingId = 'obsRepeating' + gId + '_' + groupId
                        model[repeatingId] = [];
                        groupModel = {};
                        groupModel.groupConcept = question.questionOptions.concept;
                        obsField = {
                            type: 'repeatSection',
                            key: repeatingId,
                            data: {
                                concept: question.questionOptions.concept
                            },
                            templateOptions: {
                                label: question.label,
                                btnText: 'Add',
                                fields: [{
                                    className: 'row',
                                    fieldGroup: fieldsArray
                                }]
                            }
                        };
                        _createFieldsFactory(question.questions, fieldsArray,
                            groupModel, questionMap);

                        HistoricalFieldHelperService.handleHistoricalExpressionProperty(obsField, question);

                        if (typeof obsField['templateOptions']['setFieldValue'] !== 'function') {
                            obsField['templateOptions']['setFieldValue'] =
                            HistoricalFieldHelperService.fillGroups;
                        }

                        HistoricalFieldHelperService.
                            handleModelBluePrintFunctionForGroupsProperty(obsField, question);

                        HistoricalFieldHelperService.
                            handleGetDisplayValueFunctionForGroupsProperty(obsField, question);

                        //convert to array
                        var updateRepeatModel = [];
                        updateRepeatModel.push(groupModel);

                        model[repeatingId] = updateRepeatModel;
                        fields.push(OpenmrsFieldHandler.createAnchorField(obsField.key));
                        fields.push(obsField);
                        if (obsField.templateOptions.historicalExpression) {
                            fields.push(HistoricalFieldHelperService.
                                createHistoricalTextField(obsField, model, obsField.key, question.historicalPrepopulate));
                        }

                    }

                } else if (question.type.startsWith('encounter')) {
                    handlerMethod = OpenmrsFieldHandler.getFieldHandler(question.type + 'FieldHandler');
                    var field = handlerMethod(question, model, questionMap);
                    fields.push(OpenmrsFieldHandler.createAnchorField(field.key));
                    fields.push(field);

                } else if (question.type.startsWith('personAttribute')) {
                    handlerMethod = OpenmrsFieldHandler.getFieldHandler('personAttributeFieldHandler');
                    var field = handlerMethod(question, model, questionMap);
                    fields.push(OpenmrsFieldHandler.createAnchorField(field.key));
                    fields.push(field);

                } else if (question.type === 'testOrder') {
                    orderCounter = orderCounter + 1;
                    var repeatingId = 'testorder' + orderCounter;
                    model[repeatingId] = {};

                    handlerMethod = OpenmrsFieldHandler.getFieldHandler('orderFieldHandler');
                    var orderField = handlerMethod(question, model[repeatingId], questionMap, repeatingId);

                    fields.push(OpenmrsFieldHandler.createAnchorField(orderField.key));
                    fields.push(orderField);

                } else {
                    handlerMethod = OpenmrsFieldHandler.getFieldHandler('defaultFieldHandler');
                    var field = handlerMethod(question, model, questionMap);

                    if (angular.isArray(field)) {
                        _.each(field, function (f) {
                            fields.push(OpenmrsFieldHandler.createAnchorField(f.key));
                            fields.push(f);
                        });
                    } else {
                        fields.push(OpenmrsFieldHandler.createAnchorField(field.key));
                        fields.push(field);
                    }
                }
            }

            return fields;
        }

    }
})();

/*
jshint -W098, -W003, -W068, -W004, -W033, -W030, -W117, -W069, -W106, -W026
jscs:disable disallowMixedSpacesAndTabs, requireDotNotation
jscs:disable requirePaddingNewLinesBeforeLineComments, requireTrailingComma
*/
(function () {
    'use strict';

    angular
        .module('openmrs.angularFormentry')
            .provider('FormentryConfig', function(){
                this.$get = FormentryConfig
            });

    FormentryConfig.$inject = ['$log'];

    function FormentryConfig($log) {

        var configObject = {
            fieldHandlers: {},
            openmrsBaseUrl: '',
            etlBaseUrl: ''
        };

        var service = {
            getConfigObject:getConfigObject,

            //field handler methods
            getFieldHandler: getFieldHandler,
            registerFieldHandler: registerFieldHandler,

            //Openmrs REST url configurations
            setOpenmrsBaseUrl: setOpenmrsBaseUrl,
            getOpenmrsBaseUrl: getOpenmrsBaseUrl,
            
            //Openmrs REST url configurations
            setEtlBaseUrl: setEtlBaseUrl,
            getEtlBaseUrl: getEtlBaseUrl
        };

        return service;

        function getConfigObject() {
            return configObject;
        }

        function getFieldHandler(handlerName) {
            if (handlerName in configObject.fieldHandlers) {
                $log.debug('Fetching ' + handlerName + ' handler');
                return configObject.fieldHandlers[handlerName];
            } else {
                $log.warn('Failed to get the required fieldHandler, ' +
                          'returning defaultFieldHandler');
                return configObject.fieldHandlers['defaultFieldHandler'];
            }
        }

        function registerFieldHandler(handlerName, handlerMethod) {
            configObject.fieldHandlers[handlerName] = handlerMethod;
        }

        function setOpenmrsBaseUrl(value) {
            $log.debug('Setting openmrs url to ' + value);
            configObject.openmrsBaseUrl = value;
        }

        function getOpenmrsBaseUrl() {
          if (typeof configObject.openmrsBaseUrl === 'function') {
            return configObject.openmrsBaseUrl();
          } else {
            return configObject.openmrsBaseUrl;
          }            
        }
        
        function setEtlBaseUrl(value) {
            $log.debug('Setting etl url to ' + value);
            configObject.etlBaseUrl = value;
        }

        function getEtlBaseUrl() {
          if (typeof configObject.etlBaseUrl === 'function') {
            return configObject.etlBaseUrl();
          } else {
            return configObject.etlBaseUrl;
          }            
        }
    }
})();

/*
jshint -W098, -W003, -W068, -W004, -W033, -W030, -W117, -W069, -W106, -W026
jscs:disable disallowMixedSpacesAndTabs, requireDotNotation
jscs:requirePaddingNewLinesBeforeLineComments, requireTrailingComma
*/
(function () {
    'use strict';

    angular
        .module('openmrs.angularFormentry')
        .factory('OpenmrsFieldHandlerService', OpenmrsFieldHandler);

    OpenmrsFieldHandler.$inject = [
        '$log',
        'SearchDataService',
        'FormValidator',
        'FormentryConfig',
        'HistoricalFieldHelperService',
        'OrdersFieldHandler'
    ];

    var obsId = 0;

    function OpenmrsFieldHandler($log, SearchDataService, FormValidator,
        FormentryConfig, HistoricalFieldHelperService, OrdersFieldHandler) {
        var currentQuestionMap = {};

        // Register Openmrs specific handlers
        FormentryConfig.registerFieldHandler('obsFieldHandler',
            obsFieldHandler);
        FormentryConfig.registerFieldHandler('encounterTypeFieldHandler',
            encounterTypeFieldHandler);
        FormentryConfig.registerFieldHandler('personAttributeFieldHandler',
            personAttributeFieldHandler);
        FormentryConfig.registerFieldHandler('encounterDatetimeFieldHandler',
            encounterDatetimeFieldHandler);
        FormentryConfig.registerFieldHandler('encounterProviderFieldHandler',
            encounterProviderFieldHandler);
        FormentryConfig.registerFieldHandler('encounterLocationFieldHandler',
            encounterLocationFieldHandler);
        FormentryConfig.registerFieldHandler('conceptSearchFieldHandler',
            conceptSearchFieldHandler);
        FormentryConfig.registerFieldHandler('locationAttributeFieldHandler',
            locationAttributeFieldHandler);
        FormentryConfig.registerFieldHandler('orderFieldHandler',
            OrdersFieldHandler.createOrderField);
        FormentryConfig.registerFieldHandler('defaultFieldHandler',
            defaultFieldHandler);

        var service = {
            getFieldHandler: FormentryConfig.getFieldHandler,
            createAnchorField: createAnchorField
        };

        return service;

        function encounterTypeFieldHandler(_field) {
            $log.info('loading fieldHandler');
        }

        function encounterDatetimeFieldHandler(_question, model, questionMap) {
            $log.info('loading datetime fieldHandler');
            var field = {};
            field = _createFormlyFieldHelper(_question, model, questionMap);
            field.type = 'datetimepicker';
            _addToQuestionMap(_question, field, questionMap);
            return field;
        }

        function encounterLocationFieldHandler(_question, model, questionMap) {
            $log.info('loading location fieldHandler');
            var field = {};
            field = _createFormlyFieldHelper(_question, model, questionMap);
            _handleFieldUiSelect(field);
            field['templateOptions']['deferredFilterFunction'] = SearchDataService.findLocation;
            field['templateOptions']['getSelectedObjectFunction'] = SearchDataService.getLocationByUuid;
            _addToQuestionMap(_question, field, questionMap);
            return field;
        }

        function encounterProviderFieldHandler(_question, model, questionMap) {
            $log.info('loading provider fieldHandler');
            var field = {};
            field = _createFormlyFieldHelper(_question, model, questionMap);
            _handleFieldUiSelect(field);
            field['templateOptions']['valueProp'] = 'personUuid';
            field['templateOptions']['deferredFilterFunction'] = SearchDataService.findProvider;
            field['templateOptions']['getSelectedObjectFunction'] = SearchDataService.getProviderByUuid;
            _addToQuestionMap(_question, field, questionMap);
            return field;
        }

        function conceptSearchFieldHandler(_question, model, questionMap) {
            $log.info('loading fieldHandler');
            var field = {};
            field = _createFormlyFieldHelper(_question, model, questionMap);
            field['templateOptions']['type'] = 'concept-search-select';
            _addToQuestionMap(_question, field, questionMap);
            return field;
        }

        function locationAttributeFieldHandler(_question, model, questionMap) {
            $log.info('loading fieldHandler');
            var field = {};
            field = _createFormlyFieldHelper(_question, model, questionMap);
            _handleFieldUiSelect(field);
            field['templateOptions']['type'] = _question.questionOptions.rendering;
            field['templateOptions']['deferredFilterFunction'] = SearchDataService.findLocation;
            field['templateOptions']['getSelectedObjectFunction'] = SearchDataService.getLocationByUuid;
            _addToQuestionMap(_question, field, questionMap);
            return field;
        }

        function personAttributeFieldHandler(_question, model, questionMap) {
            $log.info('loading person attribute fieldHandler');
            var field = {};
            field = _createFormlyFieldHelper(_question, model, questionMap);
            _handlePersonAttributeField(field);
            field['templateOptions']['type'] = _question.questionOptions.rendering;
            field['templateOptions']['deferredFilterFunction'] = SearchDataService.findLocation;
            field['templateOptions']['getSelectedObjectFunction'] = SearchDataService.getLocationByUuid;
            _addToQuestionMap(_question, field, questionMap);
            return field;
        }

        function defaultFieldHandler(_question, model, questionMap) {
            $log.info('loading default fieldHandler');
            var field = {};
            field = _createFormlyFieldHelper(_question, model, questionMap);
            _addToQuestionMap(_question, field, questionMap);
            var fieldArray = [];
            var obsDateField;
            if (_question.questionOptions.showDate === 'true') {
                obsDateField = angular.copy(field);
                _handleShowDate(obsDateField, _question, questionMap);
                fieldArray.push(field);
                fieldArray.push(obsDateField);
                return fieldArray;
            } else {
                return field;
            }
        }

        function obsFieldHandler(_question, model, questionMap) {
            $log.info('loading obs fieldHandler');
            var obsField = {};
            obsField = _createObsFormlyField(_question, model, questionMap);
            currentQuestionMap = questionMap;
            return obsField;
        }

        function createFieldKey(_question, _id) {
            var key;
            var fKey;
            var id;
            if (_question.type === 'obs') {
                id = _id + 1;
                obsId = id;
                fKey = _question.questionOptions.concept;
                key = 'obs' + id + '_' + fKey.replace(/-/gi, 'n'); // $$ Inserts a "$".
            } else if (_question.type === 'personAttribute') {
                fKey = _question.questionOptions.attributeType;
                key = 'personAttribute' + '_' + fKey.replace(/-/gi, 'n');
            } else {
                key = _question.type;
            }

            return key;
        }

        function _handleExpressionProperties(_field, _required, _disabled, _listener, _calculated) {
            var field = _field || {};
            var required = _isBoolean(_required) ? _required : _required ? FormValidator.getConditionalRequiredExpressionFunction(_required) : 'false';
            var disabled = _isBoolean(_disabled) ? _required : _disabled ? FormValidator.getHideDisableExpressionFunction_JS(_disabled) : 'false';
            var listener = _listener || '';
            var calculated = _calculated ? FormValidator.getCalculateExpressionFunction_JS(_calculated) : '';
            field['expressionProperties'] = {
                'templateOptions.required': required,
                'templateOptions.disabled': disabled,
                'templateOptions.hasListeners': listener,
                'templateOptions.onValueChanged': onFieldValueChanged,
                'templateOptions.calculate': calculated
            };
        }

        function _isBoolean(value) {
            if (typeof value === 'boolean') {
                return true;
            }

            if (value === 'true' || value === 'false') {
                return true;
            }
            return false;
        }

        function _handleDefaultValue(_field, _defaultValue) {
            var field = _field || {};
            var defaultVal = _defaultValue || '';
            field['defaultValue'] = defaultVal;
        }

        function _handleValidators(_field, _validators, questionMap) {
            var field = _field || {};
            //set the validator to default validator
            var defaultValidator = {
                expression: function (viewValue, modelValue, scope) {
                    return true;
                },
                message: ''
            };

            var compiledValidators = FormValidator.getFieldValidators(_validators);
            compiledValidators['defaultValidator'] = defaultValidator;
            field['validators'] = compiledValidators;
        }

        function _handleHistoricalValueSetters(field) {
            //handle external value setters
            if (typeof field['templateOptions']['setFieldValue'] !== 'function') {
                field['templateOptions']['setFieldValue'] =
                    HistoricalFieldHelperService.fillPrimitiveValue;
            }
        }

        function _handleFieldModelBlueprintCreators(field, question) {
            //handle external model blue print creators
            field['templateOptions']['createModelBluePrint'] = function (parentModel) {
                return HistoricalFieldHelperService.
                    createModelForRegularField(parentModel, field.key,
                    question, question.questionOptions.concept, 20);
            };
        }



        function _handleHide(_field, _hide) {
            var field = _field || {};
            var hide = _isBoolean(_hide) ? _hide : _hide ? FormValidator.getHideDisableExpressionFunction_JS(_hide) : 'false';
            field['hideExpression'] = hide;
        }

        function _handleFieldAnswers(_field, _answers) {
            var field = _field || {};
            var answerList = [];
            // answerList.push({name:'unselect', value:undefined});
            // get the anserq options for radio/select options/multicheckbox
            if (angular.isArray(_answers)) {
                _.each(_answers, function (answer) {
                    var item = {
                        name: answer.label,
                        value: answer.concept
                    };
                    answerList.push(item);
                });
            } else {
                $log.error('Error: Expected ' + _answers + ' to be an Array but got: ',
                    typeof _answers);
            }

            field['templateOptions']['valueProp'] = 'value';
            field['templateOptions']['labelProp'] = 'name';
            field['templateOptions']['options'] = answerList;
        }

        function _handleFieldUiSelect(_field) {
            var field = _field || {};
            field['type'] = 'ui-select-extended';
            field['templateOptions']['valueProp'] = 'uuId';
            field['templateOptions']['labelProp'] = 'display';
            field['templateOptions']['options'] = [];
        }

        function _handlePersonAttributeField(_field) {
            var field = _field || {};
            field['type'] = 'ui-select-extended';
            field['templateOptions']['valueProp'] = 'uuId';
            field['templateOptions']['labelProp'] = 'display';
            field['templateOptions']['options'] = [];
        }

        function _handleShowDate(_field, question, questionMap) {
            var field = _field || {};
            field.templateOptions = {};
            var key = field.key;
            field['key'] = key.replace(/obs/gi, 'obsDate');;
            field['type'] = 'kendo-date-picker';
            field['templateOptions']['datepickerPopup'] = 'dd-MMMM-yyyy';
            field['templateOptions']['label'] = 'Date';
            field['templateOptions']['type'] = 'text';

            if (question.questionOptions.shownDateOptions &&
                _.isEmpty(question.questionOptions.shownDateOptions.id)) {
                question.questionOptions.shownDateOptions.id = field.key;
            }

            field.data = {};
            field.data.id = field.key;

            _handleValidators(field,
                question.questionOptions.shownDateOptions ?
                    question.questionOptions.shownDateOptions.validators : [],
                questionMap);

            _handleExpressionProperties(field,
                question.questionOptions.shownDateOptions ?
                    question.questionOptions.shownDateOptions.required : undefined,
                question.questionOptions.shownDateOptions ?
                    question.questionOptions.shownDateOptions.disable : undefined,
                undefined, question.questionOptions.shownDateOptions ?
                    question.questionOptions.shownDateOptions.calculate : undefined);

            if (question.questionOptions.shownDateOptions) {
                _addToQuestionMap(question.questionOptions.shownDateOptions, field, questionMap);
            }
        }

        function _updateModelObsDateField(_question, model, field) {
            var m = {
                concept: _question.questionOptions.concept,
                schemaQuestion: _question,
                value: '',
                obsDatetime: 'true'
            };
            var fieldKey = field.key.split('.')[0];
            model[fieldKey] = m;
        }

        function onFieldValueChanged(viewVal, modelVal, fieldScope) {
            if (fieldScope.options.data.id) {
                FormValidator.updateListeners(fieldScope.options.data.id);
            }
        }

        function _createFormlyFieldHelper(_question, model, questionMap) {
            var field = {};
            var m = {};
            m = {
                concept: _question.questionOptions.concept,
                schemaQuestion: _question,
                value: ''
            };

            if (_question.type === 'personAttribute') {
                m = {
                    attributeType: _question.questionOptions.attributeType,
                    schemaQuestion: _question,
                    value: ''
                };
            }

            var fieldKey = createFieldKey(_question, obsId);
            var _model = {};
            _model[fieldKey] = m;
            var key = _model[fieldKey]; //'value';
            var keyNames = Object.keys(_model);
            // $log.debug('debug key ...', key);
            field = {
                key: keyNames[0] + '.value',
                data: {
                    concept: _question.questionOptions.concept,
                    id: _question.id
                },
                type: 'input',
                templateOptions: {
                    type: 'text',
                    label: _question.label
                }
                // ,
                // validation: {
                //   show: true
                // }
            };

            $log.debug('debug key field ...', field);
            _handleExpressionProperties(field, _question.required, _question.disable, undefined, _question.questionOptions.calculate);
            _handleDefaultValue(field, _question.default);
            _handleHide(field, _question.hide);
            _handleValidators(field, _question.validators, questionMap);
            _handleHistoricalValueSetters(field);
            _handleFieldModelBlueprintCreators(field, _question);
            HistoricalFieldHelperService.handleHistoricalExpressionProperty(field, _question);

            // if (_question.questionOptions.concept in model) { //add m to the array
            if (fieldKey in model) { //add m to the array
                // model[_question.questionOptions.concept].push(m);
                model[fieldKey] = key;
            } else { //create array with just m
                // model[_question.questionOptions.concept] = [m];
                model[fieldKey] = m;
            }

            return field;
        }

        function _addToQuestionMap(_question, _field, questionMap) {
            if ('id' in _question) {
                if (_question.id in questionMap) {
                    questionMap[_question.id].push(_field);
                } else {
                    questionMap[_question.id] = [_field];
                }
            }
        }

        function _createObsFormlyField(_question, _model, questionMap) {
            var obsField = {};
            obsField = _createFormlyFieldHelper(_question, _model, obsId);
            if (_question.questionOptions.rendering === 'date') {
                obsField['type'] = 'kendo-date-picker';
                obsField['templateOptions']['datepickerPopup'] = 'dd-MMMM-yyyy';
                obsField['templateOptions']['weeksList'] = _question.questionOptions.weeksList || [];
                if (typeof obsField['templateOptions']['setFieldValue'] !== 'function') {
                    obsField['templateOptions']['setFieldValue'] =
                        HistoricalFieldHelperService.fillPrimitiveValue;
                }

                if (typeof obsField['templateOptions']['getDisplayValue'] !== 'function') {
                    obsField['templateOptions']['getDisplayValue'] =
                        function (value, callback) {
                            HistoricalFieldHelperService.
                                getDisplayText(value, callback, _question.label);
                        };
                }

            } else if (_question.questionOptions.rendering === 'number') {
                obsField['templateOptions']['type'] = _question.questionOptions.rendering;
                obsField['templateOptions']['min'] = _question.questionOptions.min;
                obsField['templateOptions']['max'] = _question.questionOptions.max;

                if (typeof obsField['templateOptions']['setFieldValue'] !== 'function') {
                    obsField['templateOptions']['setFieldValue'] =
                        HistoricalFieldHelperService.fillPrimitiveValue;
                }

                if (typeof obsField['templateOptions']['getDisplayValue'] !== 'function') {
                    obsField['templateOptions']['getDisplayValue'] =
                        function (value, callback) {
                            HistoricalFieldHelperService.getDisplayText(value, callback, _question.label);
                        };
                }

            } else if (_question.questionOptions.rendering === 'problem') {
                _handleFieldUiSelect(obsField);
                obsField['templateOptions']['deferredFilterFunction'] = SearchDataService.findProblem;
                obsField['templateOptions']['getSelectedObjectFunction'] = SearchDataService.getProblemByUuid;

                if (typeof obsField['templateOptions']['setFieldValue'] !== 'function') {
                    obsField['templateOptions']['setFieldValue'] =
                        HistoricalFieldHelperService.fillPrimitiveValue;
                }
            } else if (_question.questionOptions.rendering === 'drug') {
                _handleFieldUiSelect(obsField);
                obsField['templateOptions']['deferredFilterFunction'] = SearchDataService.findDrugConcepts;
                obsField['templateOptions']['getSelectedObjectFunction'] = SearchDataService.getDrugConceptByUuid;

                if (typeof obsField['templateOptions']['setFieldValue'] !== 'function') {
                    obsField['templateOptions']['setFieldValue'] =
                        HistoricalFieldHelperService.fillPrimitiveValue;
                }
            } else if (_question.questionOptions.rendering === 'select-concept-answers') {
                obsField['type'] = 'concept-search-select';
                obsField['templateOptions']['options'] = [];
                obsField['templateOptions']['displayMember'] = 'label';
                obsField['templateOptions']['valueMember'] = 'concept';
                obsField['templateOptions']['questionConceptUuid'] = _question.questionOptions.concept;
                obsField['templateOptions']['type'] = _question.questionOptions.rendering;
                obsField['templateOptions']['fetchOptionsFunction'] = SearchDataService.getConceptAnswers;
                if (typeof obsField['templateOptions']['setFieldValue'] !== 'function') {
                    obsField['templateOptions']['setFieldValue'] =
                        HistoricalFieldHelperService.fillPrimitiveValue;
                }
            } else if ((_question.questionOptions.rendering === 'radio') ||
                (_question.questionOptions.rendering === 'select') ||
                (_question.questionOptions.rendering === 'multiCheckbox')) {
                _handleFieldAnswers(obsField, _question.questionOptions.answers);

                if (typeof obsField['templateOptions']['setFieldValue'] !== 'function') {
                    obsField['templateOptions']['setFieldValue'] =
                        HistoricalFieldHelperService.fillArrayOfPrimitives;
                }

                obsField['templateOptions']['getDisplayValue'] =
                    function (value, callback) {
                        HistoricalFieldHelperService.
                            getDisplayTextFromOptions(value, _question.questionOptions.answers,
                            'concept', 'label', callback, _question.label);
                    };

                if (_question.questionOptions.rendering === 'multiCheckbox') {
                    obsField['type'] = 'kendo-select-multiple';
                } else if (_question.questionOptions.rendering === 'select') {
                    obsField['type'] = 'kendo-select';
                } else {
                    obsField['type'] = 'radio';
                }
            } else if (_question.questionOptions.rendering === 'textarea') {
                obsField['type'] = _question.questionOptions.rendering;
                obsField['templateOptions']['rows'] = _question.questionOptions.rows || 15;
                obsField['templateOptions']['columns'] = _question.questionOptions.columns;
                obsField['templateOptions']['placeholder'] = _question.questionOptions.placeholder;

                if (!obsField['modelOptions']) {
                    obsField['modelOptions'] = {};
                }
                obsField['modelOptions']['debounce'] = {
                    default: 3000
                };
            }

            obsField['templateOptions']['createModelBluePrint'] = function (parentModel, value) {
                return HistoricalFieldHelperService.
                    createModelForRegularField(parentModel, obsField.key,
                    _question, _question.questionOptions.concept, value);
            };

            //finally, ensure all fields have getDisplayValue
            if (typeof obsField['templateOptions']['getDisplayValue'] !== 'function') {
                obsField['templateOptions']['getDisplayValue'] =
                    function (value, callback) {
                        HistoricalFieldHelperService.getDisplayText(value, callback, _question.label);
                    };
            }

            _addToQuestionMap(_question, obsField, questionMap);

            var fieldArray = [];
            var obsDateField = {};
            if (_question.questionOptions.showDate === 'true') {
                var key = angular.copy(obsField.key);
                obsDateField.key = key;
                _handleShowDate(obsDateField, _question, questionMap);
                _updateModelObsDateField(angular.copy(_question), _model, obsDateField);
                fieldArray.push(obsField);
                fieldArray.push(obsDateField);
                return fieldArray;
            } else {
                return obsField;
            }
        }

        function createAnchorField(ownerKey) {
            return {
                type: 'anchor',
                data: { id: 'anchor' },
                templateOptions: {
                    ownerKey: ownerKey
                }
            };
        }
    }
})();

/*
jshint -W098, -W003, -W068, -W004, -W033, -W030, -W117, -W069, -W106, -W026
jscs:disable disallowMixedSpacesAndTabs, requireDotNotation
jscs:requirePaddingNewLinesBeforeLineComments, requireTrailingComma
*/
(function () {
    'use strict';

    angular
        .module('openmrs.angularFormentry')
        .factory('OrdersFieldHandler', OrdersFieldHandler);

    OrdersFieldHandler.$inject = [
        '$log'
    ];

    function OrdersFieldHandler($log) {

        var service = {
            createOrderField: createOrderField
        };

        return service;

        function createOrderField(question, orderModel, questionMap, repeatingId) {
            initializeOrderGroupModel(orderModel, question);
            var orderField = {
                type: 'orderSection',
                key: repeatingId,
                data: {
                    selectableOrders: question.questionOptions.selectableOrders
                },
                templateOptions: {
                    label: question.label,
                    fields: [{
                        className: 'row',
                        fieldGroup: [] //TODO: Has values if 
                    }],
                    createChildFieldModel: function(concept) {
                        return createChildFieldModel(concept, orderModel);
                    }
                }
            };

            return orderField;
        }

        function initializeOrderGroupModel(orderModel, question) {
            orderModel.orderType = question.questionOptions.orderType;//'testorder';
            orderModel.orderConcepts = extractConcepts(question);
            orderModel.orderSetting = question.questionOptions.orderSettingUuid;
            orderModel.orders = [];
            orderModel.deletedOrders = [];
        }
        
        function extractConcepts(question){
            var concepts = [];
            _.each(question.questionOptions.selectableOrders,
            function(choice){
               concepts.push(choice.concept); 
            });
            
            return concepts;
        }

        function createChildFieldModel(concept, virtualOrdersGroupModel) {
            var orderModel ={};
            orderModel.concept = concept;
            orderModel.type = virtualOrdersGroupModel.orderType;
            orderModel.orderer = undefined;
            orderModel.careSetting = virtualOrdersGroupModel.orderSetting;
            return orderModel;
        }
    }
})();
/*
jshint -W098, -W003, -W068, -W004, -W033, -W030, -W117, -W069, -W106, -W026
*/
/*
jscs:disable disallowMixedSpacesAndTabs, requireDotNotation, requirePaddingNewLinesBeforeLineComments, requireTrailingComma
*/
(function () {
    'use strict';

    angular
        .module('openmrs.angularFormentry')
        .factory('FormProcessorService', FormProcessorService);

    FormProcessorService.$inject = [
        'ObsProcessorService',
        'PersonAttributesProcessorService',
        'EncounterProcessorService'
    ];

    function FormProcessorService(ObsProcessorService, PersonAttributesProcessorService,
        EncounterProcessorService) {
        var service = {
            obsFormProccesor: obsFormProccesor,
            encounterFormProcessor: encounterFormProcessor,
            personAttributeFormProccesor: personAttributeFormProccesor,
            addExistingDataSetToEncounterForm: addExistingDataSetToEncounterForm,
            addExistingDataSetToObsForm: addExistingDataSetToObsForm,
            addExistingPersonAttributesToForm:addExistingPersonAttributesToForm
        };

        return service;

        function obsFormProccesor(model) {
            return ObsProcessorService.generateObsPayload(model);
        }

        function personAttributeFormProccesor(model) {
            return PersonAttributesProcessorService.generatePersonAttributesPayload(model);
        }

        function encounterFormProcessor(model) {
            return EncounterProcessorService.generateEncounterPayload(model);
        }

        function addExistingDataSetToObsForm(restObs, model) {
            ObsProcessorService.addExistingObsSetToForm(model, restObs);
        }

        function addExistingDataSetToEncounterForm(restDataset, model) {
            EncounterProcessorService.populateModel(model, restDataset);
        }

        function addExistingPersonAttributesToForm(restDataset, model) {
            return PersonAttributesProcessorService.addExistingPersonAttributesToForm(restDataset,model);
        }
    }
})();

/*
jshint -W098, -W003, -W068, -W004, -W033, -W030, -W117, -W069, -W106, -W026
*/
/*
jscs:disable disallowMixedSpacesAndTabs, requireDotNotation, requirePaddingNewLinesBeforeLineComments, requireTrailingComma
*/
(function () {
  'use strict';

  angular
    .module('openmrs.angularFormentry')
    .factory('ObsProcessorService', ObsProcessService);

  ObsProcessService.$inject = ['$filter', '$log'];

  function ObsProcessService($filter, $log) {
    var updatedModel;
    var service = {
      generateObsPayload: generateObsPayload,
      addExistingObsSetToForm: addExistingObsSetToForm
    };

    return service;

    function generateObsPayload(model) {
      return _getSections(model);
    }

    function addExistingObsSetToForm(model, openmrsRestObj) {
      _addExistingObsToSections(model, openmrsRestObj);
      updatedModel = angular.copy(model);
    }

    function _getRepeatingFieldsModel() {
      var repeatingFieldsModel = {};
      for (var i in updatedModel) {
        var sectionModel = updatedModel[i];
        for (var p in sectionModel) {
          var f = sectionModel[p];
          if (p.startsWith('obsRepeating')) {
            repeatingFieldsModel[p] = f;
          }
        }
      }
      // $log.error('Repeating model', repeatingFieldsModel);
      return repeatingFieldsModel;
    }

    function _parseDate(value, format, offset) {
      var format = format || 'yyyy-MM-dd HH:mm:ss';
      var offset = offset || '+0300';

      if (!(value instanceof Date)) {
        value = new Date(value);
        if (_.isNull(value) || _.isUndefined(value)) {
          return '';
        }
      }

      return $filter('date')(value, format, offset);
    }

    function _addExistingObsToSections(model, openmrsRestObj) {
      var obsRestPayload = [];
      // $log.debug('Model', model);
      var sectionKeys = Object.keys(model);
      // $log.debug('Section Keys', sectionKeys);
      _.each(sectionKeys, function (section) {
        var sectionModel = model[section];
        // $log.debug('Section Models', sectionModel);
        _addObsToSection(sectionModel, openmrsRestObj);
      });
    }

    function _addObsToField(field, obs) {
      var val = _.filter(obs, function (o) {
        if (o.concept.uuid === field.concept) {
          return o;
        }
      });

      var opts = [];
      var optsUuid = [];
      _.each(val, function (o) {
        if (field.obsDatetime) {
          //special case for fields having showDate property
          field.initialValue = new Date(o.obsDatetime);
          field.initialUuid = o.uuid;
          field.value = new Date(o.obsDatetime);
        } else if (field.schemaQuestion.questionOptions.rendering === 'date') {
          field.initialValue = new Date(o.value);
          field.initialUuid = o.uuid;
          field.value = new Date(o.value);
        } else if (field.schemaQuestion.questionOptions.rendering === 'multiCheckbox') {
          if (!(_.isEmpty(o.value) || _.isUndefined(o.value.uuid))) {
            opts.push(o.value.uuid);
            optsUuid.push(o.uuid);
          } else {
            opts.push(o.value);
            optsUuid.push(o.uuid);
          }

          field.initialValue = opts;
          field.initialUuid = optsUuid;
          field.value = opts;
        } else {
          if (!(_.isEmpty(o.value) || _.isUndefined(o.value.uuid))) {
            field.initialValue = o.value.uuid;
            field.initialUuid = o.uuid;
            field.value = o.value.uuid;
          } else {
            field.initialValue = o.value;
            field.initialUuid = o.uuid;
            field.value = o.value;
          }
        }
      });
    }

    function getGroupSectionObs(obs, concept) {
      var results = {
        obs: []
      };
      var val = _.filter(obs, function (o) {
        if (o.concept.uuid === concept) {
          return o;
        }
      });

      if (!_.isUndefined(val)) {
        results.repeatObs = val;
        _.each(val, function (o) {
          if (!_.isNull(o.groupMembers)) {
            results.obs = _.union(results.obs, o.groupMembers);
          } else {
            results.obs.push(o);
          }
        });
      }

      return results;
    }

    function _addObsToSection(sectionModel, openmrsRestObj) {
      var fieldKeys = typeof sectionModel === 'object' ? Object.keys(sectionModel) : '';
      //geting obs data without obs groups
      var obsData = _.filter(openmrsRestObj.obs, function (obs) {
        if (_.isNull(obs.groupMembers)) {
          return obs;
        }
      });

      //geting obs data with obs groups
      var obsGroupData = _.filter(openmrsRestObj.obs, function (obs) {
        if (obs.groupMembers !== null) {
          return obs;
        }
      });

      _.each(fieldKeys, function (fieldKey) {
        if (fieldKey.startsWith('obsGroup')) {
          var sectionFields = sectionModel[fieldKey];
          var sectionKeys = Object.keys(sectionFields);
          var concept = sectionFields[sectionKeys[0]];
          var sectionObs = getGroupSectionObs(obsGroupData, concept);
          _addObsToSection(sectionFields, sectionObs);

        } else if (fieldKey.startsWith('obsRepeating')) {
          var sectionFields = sectionModel[fieldKey];
          var sectionKeys = Object.keys(sectionFields[0]);
          // some repeating sections may miss the concept and schemaQuestion
          // attributes, therefore we will need to rebuild this b4 passing
          // it for processing
          /*
          get the number of repeats and add the extra repeats in the model
          This is also need to handle repeating groups without obs groups
          Ideally this ends up as an array of rest obs
          */

          var concept = sectionFields[0][sectionKeys[0]];
          /*
          for repeating obs with obsGroup there will always be some grouping concept.
          However there are cases where one mya allow repeating section without a grouping
          concept. In this case, the obs we expect is simply an array without group members
          otherwise we will always have group members
          */
          var sectionObs;
          if (concept) {
            sectionObs = getGroupSectionObs(obsGroupData, concept);
          } else {
            /*
            handle repeating fields without obs group concept
            */
            var customObs = [];
            for (var i = 1; i < sectionKeys.length; i++) {
              var f = sectionFields[0][sectionKeys[i]];
              var c = f.concept;
              sectionObs = getGroupSectionObs(obsData, c);
              _.each(sectionObs.obs, function (o, k) {
                var obj = {
                  groupMembers: []
                };
                if (customObs.length < k + 1) {
                  obj.groupMembers.push(o);
                  customObs.push(obj);
                } else {
                  obj = customObs[k];
                  obj.groupMembers.push(o);
                }
              });
            }

            sectionObs.repeatObs = customObs;
          }

          // $log.debug('fields tests obs', sectionObs.repeatObs);
          if (sectionObs.repeatObs.length > 1 && sectionFields.length < sectionObs.repeatObs.length) {
            //there is need to get if the group has the repeating column before
            //determining how many times the columns are to be repeated
            var colDetails = sectionFields[0];
            var nRows = 0;
            for (var x in colDetails) {
              if (x !== 'groupConcept') {
                var thisCol = colDetails[x];
                var thisColConcept = thisCol.concept;
                var n = 0; // no of repeats for the current field
                for (var r = 0; r < sectionObs.repeatObs.length; r++) {
                  var thisObs = sectionObs.repeatObs[r];
                  //get if concept is available in the group members
                  for (var gm = 0; gm < thisObs.groupMembers.length; gm++) {
                    if (thisObs.groupMembers[gm].concept.uuid === thisColConcept) {
                      n++;
                    }
                  }
                  if (n > nRows) nRows = n;
                }
              }
            }

            for (var i = 1; i < nRows; i++) {
              //create duplicate fields if we have more repeating values in the rest obs
              sectionFields.push(angular.copy(sectionFields[0]));
              // $log.error('Repeating tests', sectionFields[0]);
            }
          }

          var results = {
            obs: []
          };
          var repeatObs = sectionObs.repeatObs;
          _.each(sectionFields, function (_sectionFields, k) {
            var concepLists = [];
            for (var vx in _sectionFields) {
              if (vx !== 'groupConcept') {
                var thisCol = _sectionFields[vx];
                concepLists.push(thisCol.concept);
              }
            }
            var fieldRestObs = [];
            // $log.error('Repeating Concept Lists ++  ', concepLists);
            for (var r = 0; r < repeatObs.length; r++) {
              var thisObs = repeatObs[r];
              // $log.error('Repeating Lists ++  ', thisObs);
              //get if concept is available in the group members
              for (var gm = 0; gm < thisObs.groupMembers.length; gm++) {
                if (_.contains(concepLists, thisObs.groupMembers[gm].concept.uuid)) {
                  // $log.error('Repeating Values ++  ', thisObs.groupMembers);
                  if (!_.contains(fieldRestObs, thisObs)) {
                    fieldRestObs.push(thisObs);
                  }
                }
              }
            }
            // sectionObs = results;
            // $log.error('Repeating Values ++3  ', fieldRestObs);
            if (fieldRestObs[k]) {
              results.obs = fieldRestObs[k].groupMembers;
              sectionObs = results;
            }
            // $log.error('Repeating Field obs ', sectionObs);

            _addObsToSection(_sectionFields, sectionObs);
          });
        } else if (fieldKey.startsWith('obs')) {
          var field = sectionModel[fieldKey];
          _addObsToField(field, obsData);
        }
      });
    }

    function _getSections(model) {
      var obsRestPayload = [];
      // $log.debug('Model', model);
      var sectionKeys = Object.keys(model);
      // $log.debug('Section Keys', sectionKeys);
      _.each(sectionKeys, function (section) {
        var sectionModel = model[section];
        // $log.debug('Section Models', sectionModel);
        _generateSectionPayLoad(sectionModel, obsRestPayload);
      });

      return obsRestPayload;
    }

    function _generateSectionPayLoad(sectionModel, obsRestPayload) {
      var repeatingFieldsModel = _getRepeatingFieldsModel();
      var fieldKeys = typeof sectionModel === 'object' ? Object.keys(sectionModel) : [];
      // $log.debug('fieldKeys', fieldKeys);
      _.each(fieldKeys, function (fieldKey) {
        if (fieldKey.startsWith('obsGroup')) {
          var sectionFields = sectionModel[fieldKey];
          var sectionKeys = Object.keys(sectionFields);
          var concept = sectionFields[sectionKeys[0]];
          var sectionObs = [];
          var obs = {
            concept: concept,
            groupMembers: sectionObs
          };

          _generateSectionPayLoad(sectionFields, sectionObs);
          if (sectionObs.length > 0) {
            obsRestPayload.push(obs);
          }

        } else if (fieldKey.startsWith('obsRepeating')) {
          var sectionFields = sectionModel[fieldKey];
          var originalModel;
          var sectionKeys;
          if (sectionFields.length > 0) {
            sectionKeys = Object.keys(sectionFields[0]);
          } else {
            if (_.has(repeatingFieldsModel, fieldKey)) {
              originalModel = repeatingFieldsModel[fieldKey];
              sectionKeys = Object.keys(originalModel[0]);
            }
          }

          if (sectionFields.length === 0) {
            // $log.debug('Repeating section', sectionKeys);
            // $log.debug('Repeating fields', sectionFields);
            //if the current model has no values
            //take the original model but set the value property to null
            _.each(originalModel, function (_sectionFields) {
              for (var i in _sectionFields) {
                var f = _sectionFields[i];
                if (_.has(f, 'value')) {
                  f.value = "";
                }
              }
            });

            // set the current model to the original model
            sectionFields = originalModel;
          } else {
            //compare the original model and the current model
            // to determine the variances before rebuilding the model that
            // will finally be used for generating the payload
            originalModel = repeatingFieldsModel[fieldKey];
            _.each(originalModel, function (_sectionFields) {
              var found = false;
              var f;
              var fm;
              for (var i in _sectionFields) {
                f = _sectionFields[i];
                if (_.has(f, 'initialValue')) {
                  f.value = "";
                  _.each(sectionFields, function (_sf) {
                    for (var j in _sf) {
                      fm = _sf[j];
                      if (_.has(fm, 'initialValue')) {
                        if (f.initialValue === fm.initialValue) {
                          found = true;
                        }
                      }
                    }
                  });
                }
              }

              if (found === false) {
                sectionFields.push(_sectionFields);
              }
            });
          }
          // $log.debug('Repeating fieldsxxx', sectionFields);
          _.each(sectionFields, function (_sectionFields) {
            var fieldKeys = Object.keys(_sectionFields);
            var sectionObs = [];
            var concept = sectionFields[0][sectionKeys[0]];

            var obs = {
              concept: concept,
              groupMembers: sectionObs
            };
            _generateSectionPayLoad(_sectionFields, sectionObs);
            // console.log('Repeating obs b4 updating payload', obs);
            if (sectionObs.length > 0) {
              if (!_.isUndefined(obs.concept)) {
                obsRestPayload.push(obs);
              } else {
                _.each(sectionObs, function (o) {
                  obsRestPayload.push(o);
                });
              }

            }
          });

        } else if (fieldKey.startsWith('obs')) {
          var field = sectionModel[fieldKey];
          _generateFieldPayload(field, obsRestPayload);
        }

      });
    }

    function _setValue(field) {
      var obs = {};
      var initialValue = field.initialValue;
      var value = field.value;
      if (field.schemaQuestion.questionOptions.rendering === 'date') {
        if (_.isDate(value) || (!_.isUndefined(value) && !_.isNull(value) && value !== '')) {
          value = _parseDate(field.value);
          console.log('test value', value, field.value);
        }
        if (_.isDate(initialValue) || (!_.isUndefined(initialValue) && !_.isNull(initialValue))) {
          initialValue = _parseDate(field.initialValue);
        }
      }

      if (_.isUndefined(initialValue) && (!_.isNull(value) &&
        value !== '' && !_.isUndefined(value) && !_.isObject(value))) {
        obs = {
          concept: field.concept,
          value: value
        };

      } else if (initialValue !== value && (!_.isNull(value) &&
        value !== '' && !_.isUndefined(value) && !_.isObject(value))) {
        obs = {
          uuid: field.initialUuid,
          concept: field.concept,
          value: value
        };
      } else if (initialValue !== value && (!_.isNull(value) &&
        value === '' && !_.isUndefined(value) && !_.isUndefined(initialValue) && !_.isObject(value))) {
        obs = {
          uuid: field.initialUuid,
          concept: field.concept,
          value: value,
          voided: true
        };
      }

      return obs;
    }

    function _generateFieldPayload(field, obsRestPayload) {
      var obs = {};
      var qRender = field.schemaQuestion.questionOptions.rendering;
      if (field.schemaQuestion.questionOptions.showDate &&
        field.obsDatetime) {
        //This shld be an obs date for the previous field
        var lastFieldPayload;
        if (obsRestPayload.length > 0) {
          lastFieldPayload = obsRestPayload[obsRestPayload.length - 1];
          $log.debug('last obs payload', lastFieldPayload);

          if (!_.isEmpty(field.value) && _.isEmpty(lastFieldPayload.obsDatetime)) {
            lastFieldPayload.obsDatetime = _parseDate(field.value);
          }
        }

      } else if (_.isString(field.value) || _.isNumber(field.value)) {
        obs = _setValue(field);
        if (Object.keys(obs).length > 0) {
          obsRestPayload.push(obs);
        }
      } else if (_.isArray(field.value) || _.isArray(field.initialValue)) {
        var initialValue = field.initialValue;
        var initialUuid = field.initialUuid;
        var value = field.value;
        if (initialValue === undefined && (!_.isNull(value) &&
          value !== '' && !_.isUndefined(value))) {
          _.each(value, function (val) {
            obs = {
              concept: field.concept,
              value: val
            };
            if (obs) {
              $log.debug('obs payload', obs);
              obsRestPayload.push(obs);
            }

            $log.debug('obs REST payload', obsRestPayload);
          });

        } else if (initialValue !== value && (!_.isNull(value) &&
          value !== '' && !_.isUndefined(value))) {
          var existingObs = _.intersection(initialValue, value);
          var newObs = [];
          var obsToFilter = [];
          var obsToVoid = [];
          var i = 0;
          _.each(initialValue, function (val) {
            if (!(_.contains(value, val))) {
              obs = {
                concept: field.concept,
                value: val,
                uuid: initialUuid[i],
                voided: true
              };
              obsToVoid.push(val);
              obsRestPayload.push(obs);
            }
            i++;
          });

          obsToFilter = _.union(obsToVoid, existingObs);
          newObs = _.difference(value, obsToFilter);
          _.each(newObs, function (val) {
            obs = {
              concept: field.concept,
              value: val
            };
            obsRestPayload.push(obs);
          });
        }
      } else if (qRender === 'date' || _.isDate(field.value)) {
        obs = _setValue(field);
        if (Object.keys(obs).length > 0) {
          obsRestPayload.push(obs);
        }
      } else {
        obs = _setValue(field);
        if (Object.keys(obs).length > 0) {
          obsRestPayload.push(obs);
        }
      }
    }
  }
})();

/*
jshint -W098, -W003, -W068, -W004, -W033, -W030, -W117, -W069, -W106, -W026
jscs:disable disallowMixedSpacesAndTabs, requireDotNotation
jscs:disable requirePaddingNewLinesBeforeLineComments, requireTrailingComma
*/
(function () {
    'use strict';

    angular
        .module('openmrs.angularFormentry')
        .factory('OrderProcessorService', OrderProcessorService);

    OrderProcessorService.$inject = [
        'FormentryUtilService',
        '$log'
    ];

    function OrderProcessorService(utils, $log) {
        var service = {
            //main functions
            generateOrderPayload: generateOrderPayload,
            populateModel: populateModel,
            populatePayloadProvider: populatePayloadProvider,

            //internal functions exposed for testing
            createOrderModel: createOrderModel,
            findVirtualGroupModelByConcept: findVirtualGroupModelByConcept,
            fillVirtualGroupsModelWithPayload: fillVirtualGroupsModelWithPayload,
            extractVirtualOrderGroupsFromModel: extractVirtualOrderGroupsFromModel,

            getOrderPayload: getOrderPayload,
            getVirtualGroupOrderPayload: getVirtualGroupOrderPayload,
            mergeVirtualGroupOrderPayLoads: mergeVirtualGroupOrderPayLoads
        };

        return service;

        function generateOrderPayload(model) {
            var orderGroups = extractVirtualOrderGroupsFromModel(model);
            var arrayOfOrderGroupPayload = [];

            _.each(orderGroups, function (orderGroup) {
                arrayOfOrderGroupPayload.push(getVirtualGroupOrderPayload(orderGroup));
            });

            if (arrayOfOrderGroupPayload.length != 0) {
                return mergeVirtualGroupOrderPayLoads(arrayOfOrderGroupPayload);
            }
        }

        function populateModel(model, payload) {
            var orderPayload = payload;
            if (!angular.isArray(payload)) {
                orderPayload = payload.orders;
            }
            var virtualGroups = extractVirtualOrderGroupsFromModel(model);

            fillVirtualGroupsModelWithPayload(orderPayload, virtualGroups);
        }

        function createOrderModel(orderPayload) {
            return {
                uuid: orderPayload.uuid,
                concept: orderPayload.concept.uuid,
                type: orderPayload.type,
                orderer: orderPayload.orderer.uuid,
                careSetting: orderPayload.careSetting.uuid,
                orderNumber: orderPayload.orderNumber
            };
        }

        function findVirtualGroupModelByConcept(concept, virtualGroupsArray) {
            for (var i = 0; i < virtualGroupsArray.length; i++) {
                if (virtualGroupsArray[i].orderConcepts.indexOf(concept) > -1) {
                    return virtualGroupsArray[i];
                }
            }
        }

        function fillVirtualGroupsModelWithPayload(orderPayloadArray, virtualGroupsArray) {
            _.each(orderPayloadArray, function (orderPayload) {
                var group =
                    findVirtualGroupModelByConcept(orderPayload.concept.uuid, virtualGroupsArray);

                var orderModel = createOrderModel(orderPayload);
                if (!angular.isArray(group.orders)) {
                    group.orders = [];
                }

                group.orders.push(orderModel);
            });
        }

        function extractVirtualOrderGroupsFromModel(model) {
            var arrayOfVirtualGroups = [];
            _fillArrayWithVirtualGroupsRecursively(arrayOfVirtualGroups, model);
            return arrayOfVirtualGroups;

        }

        function _fillArrayWithVirtualGroupsRecursively(array, subModel) {
            if (_.isEmpty(subModel)) {
                return;
            }

            if (angular.isArray(subModel)) {
                _.each(subModel, function (obj) {
                    _fillArrayWithVirtualGroupsRecursively(array, obj);
                });
                return;
            }

            if (angular.isArray(subModel.orderConcepts)) {
                array.push(subModel);
                return;
            }

            if (typeof subModel === 'object')
                _.each(Object.keys(subModel), function (key) {
                    if (angular.isArray(subModel[key]) || typeof subModel[key] === 'object') {
                        _fillArrayWithVirtualGroupsRecursively(array, subModel[key]);
                    }
                });
        }

        function getOrderPayload(orderModel) {
            if (orderModel) {
                if (orderModel.uuid) {
                    //case existing order
                    return {
                        uuid: orderModel.uuid
                    };
                } else {
                    //case new order
                    return {
                        concept: orderModel.concept,
                        type: orderModel.type,
                        orderer: orderModel.orderer,
                        careSetting: orderModel.careSetting
                    };
                }
            }
        }

        function getVirtualGroupOrderPayload(groupOrderModel) {
            var payloadObject = {
                encounterAppendableOrderPayload: [],
                deletedOrdersUuid: []
            };

            _.each(groupOrderModel.orders, function (order) {
                payloadObject.encounterAppendableOrderPayload.push(getOrderPayload(order));
            });

            _.each(groupOrderModel.deletedOrders, function (order) {
                if (order.uuid) {
                    payloadObject.deletedOrdersUuid.push(order.uuid);
                }
            });
            return payloadObject;
        }

        function mergeVirtualGroupOrderPayLoads(arrayOfVirtualGroupOrderPayload) {
            var finalPayloadObject = {
                encounterAppendableOrderPayload: [],
                deletedOrdersUuid: []
            };

            _.each(arrayOfVirtualGroupOrderPayload, function (payload) {
                finalPayloadObject.encounterAppendableOrderPayload =
                    finalPayloadObject.encounterAppendableOrderPayload.
                        concat(payload.encounterAppendableOrderPayload);

                finalPayloadObject.deletedOrdersUuid =
                    finalPayloadObject.deletedOrdersUuid.
                        concat(payload.deletedOrdersUuid);
            });

            return finalPayloadObject;
        }

        function populatePayloadProvider(order, providerUuid) {
            if (angular.isArray(order)) {
                _.each(order, function (singleOrder) {
                    if (typeof singleOrder === 'object') {
                        singleOrder.orderer = providerUuid;
                    }
                });
                return;
            }
            
            if (typeof order === 'object') {
                order.orderer = providerUuid;
                return;
            }

            
        }

    }
})();
/*
jshint -W106, -W052, -W098, -W003, -W068, -W004, -W033, -W030, -W117, -W116, -W069, -W026
*/
(function () {
    'use strict';

    angular
        .module('openmrs.angularFormentry')
        .service('CurrentLoadedFormService', CurrentLoadedFormService);

    CurrentLoadedFormService.$inject = [];

    function CurrentLoadedFormService() {
        var lastFound;

        var service = {
            formModel: {},
            questionMap: {},
            listenersMetadata: {},
            clearQuestionValueByKey: clearQuestionValueByKey,
            getAnswerByQuestionKey: getAnswerByQuestionKey,
            getContainingObjectForQuestionKey: getContainingObjectForQuestionKey,
            getFieldKeyFromGlobalById: getFieldKeyFromGlobalById,
            getFieldKeyById: getFieldKeyById
        };

        return service;

        function getFieldKeyFromGlobalById(id) {
            var obj = service.questionMap[id];
            if (obj && !Array.isArray(obj)) {
                return service.questionMap[id].key.split('.')[0];
            } else if(obj && Array.isArray(obj)) {
                if(service.questionMap[id].key) {
                    return service.questionMap[id].key.split('.')[0];
                } else {
                    return service.questionMap[id][0].key.split('.')[0];
                }
            }
            return null;
        }
        
        function getFieldKeyById(id_, searchFields) {
            var result;
            _.each(searchFields, function (cfield) {
                if (cfield.data && cfield.data.id === id_) {
                    result = cfield.key;
                    return result;
                }
            });
            return result;
        }


        function clearQuestionValueByKey(formlyModel, key) {
            var containingObject = getContainingObjectForQuestionKey(formlyModel, key);
            if (containingObject) {
                if (hasOwnProperty(containingObject[key], 'value')) {
                    if (Array.isArray(containingObject[key].value)) {
                        console.log('is array');
                        containingObject[key].value = [];
                    }
                    else if (typeof containingObject[key].value === 'number') {
                        containingObject[key].value = '';
                    }
                    else if (Object.prototype.toString.call(containingObject[key].value) === '[object Date]') {
                        containingObject[key].value = '';
                    }
                    else if (typeof containingObject[key].value === 'string') {
                        containingObject[key].value = '';
                    }
                    else if (typeof containingObject[key].value === 'object') {
                        console.log('object');
                        containingObject[key].value = {};
                    }
                    else {
                        containingObject[key].value = null;
                    }
                }
                else { //complex types such as repeating group
                    if (Array.isArray(containingObject[key])) {
                        console.log('is array: repeating group');
                        containingObject[key] = [];
                    }
                    else if (typeof containingObject[key] === 'object') {
                        console.log('object');
                        containingObject[key] = {};
                    }
                    else {
                        containingObject[key] = null;
                    }
                }
            }
        }

        function getAnswerByQuestionKey(formlyModel, key) {
            lastFound = null;
            traverse(formlyModel, key);

            if (lastFound) {
                if (typeof lastFound[key] === 'object' &&
                 hasOwnProperty(lastFound[key], 'value') && 
                hasOwnProperty(lastFound[key], 'schemaQuestion')) {
                    return lastFound[key].value;
                }
                return lastFound[key];
            }
            return undefined;
        }

        function getContainingObjectForQuestionKey(formlyModel, key) {
            lastFound = null;
            traverse(formlyModel, key);
            return lastFound;
        }

        function traverse(o, key) {
            for (var i in o) {
                if (typeof (o[i]) === 'object') {
                    if (i === key) {
                        lastFound = o;
                    }
                    traverse(o[i], key);
                }
                else {
                    if (i === key) {
                        lastFound = o;
                    }
                }
            }
        }

        function hasOwnProperty(obj, prop) {
            var proto = obj.__proto__ || obj.constructor.prototype;
            return (prop in obj) &&
                (!(prop in proto) || proto[prop] !== obj[prop]);
        }
    }

})();
/* global angular */
/* global Exception */
/* global _ */
/*
jshint -W106, -W052, -W098, -W003, -W068, -W004, -W033, -W030, -W117, -W116, -W069, -W026
*/
(function() {
    'use strict';

    angular
        .module('openmrs.angularFormentry')
        .service('FormValidator', FormValidator);

    FormValidator.$inject = ['$filter', 'CurrentLoadedFormService', 'moment', '$timeout'];

    function FormValidator($filter, CurrentLoadedFormService, moment, $timeout) {

        var service = {
            extractQuestionIds: extractQuestionIds,
            replaceQuestionsPlaceholdersWithValue: replaceQuestionsPlaceholdersWithValue,
            replaceMyValuePlaceholdersWithActualValue: replaceMyValuePlaceholdersWithActualValue,
            evaluateExpression: evaluateExpression,
            getFieldValueToValidate: getFieldValueToValidate,
            getFieldValidator: getFieldValidatorObject,
            getFieldValidators: getFieldValidators,
            getConditionalRequiredExpressionFunction: getConditionalRequiredExpressionFunction,
            getConditionalAnsweredValidatorObject: getConditionalAnsweredValidatorObject,
            getDateValidatorObject: getDateValidatorObject,
            getJsExpressionValidatorObject: getJsExpressionValidatorObject,
            getHideDisableExpressionFunction_JS: getHideDisableExpressionFunction_JS,
            addToListenersMetadata: addToListenersMetadata,
            updateListeners: updateListeners,
            getCalculateExpressionFunction_JS: getCalculateExpressionFunction_JS,
            getHideDisableStructuredFunction: getHideDisableStructuredFunction
        };

        return service;

        function getFieldValidators(arrayOfValidations) {
            var validator = {};
            var index = 1;
            _.each(arrayOfValidations, function(validate) {
                var validatorKey = validate.type;

                validatorKey = validatorKey + index;
                index++;

                if (validate.type !== 'conditionalRequired') {
                    validator[validatorKey] = getFieldValidatorObject(validate);
                }
            });
            return validator;
        }

        function getFieldValidatorObject(params) {
            switch (params.type) {
                case 'date':
                    return getDateValidatorObject(params);
                case 'js_expression':
                    return getJsExpressionValidatorObject(params);
                case 'conditionalAnswered':
                    return getConditionalAnsweredValidatorObject(params);
                case 'conditionalRequired':
                    return getConditionalRequiredExpressionFunction(params);
            }

        }

        function getDateValidatorObject(params) {
            var validator = new Validator('', undefined);
            if (params.allowFutureDates !== 'true') {
                //case does not allow future dates
                validator.expression = function(viewValue, modelValue) {
                    /*
                    using datejs library
                    */
                    var value = modelValue || viewValue;
                    var dateValue;
                    var curDate = new Date(formatDate(new Date(), 'd-MMM-yyyy'));
                    if ((value !== undefined) && (value !== null)) {
                        dateValue = new Date(formatDate(value, 'd-MMM-yyyy'));
                    }
                    if (dateValue !== undefined) {
                        return !moment(dateValue).isAfter(curDate);
                    }
                    if (dateValue !== undefined || dateValue !== null || value !== '') {
                        return true;
                    }

                };
                validator.message = '"Should not be a future date!"';

            }
            else {
                //case should be a date
                validator.expression = function(viewValue, modelValue, elementScope) {
                    /*
                    using datejs library
                    */
                    var value = modelValue || viewValue;
                    var dateValue;
                    //var curDate = Date.parse(Date.today(), 'd-MMM-yyyy');
                    console.log('date Value ++', value);
                    if (value !== undefined && value !== null && value !== '') {
                        console.log('date Value ++', value);
                        dateValue = Date.parse(value, 'd-MMM-yyyy');
                    }
                    if (dateValue !== undefined || dateValue !== null || value !== '') {
                        return true;
                    }
                    else {
                        return false;
                    }
                };
                validator.message = '"Should be a date!"';
            }
            return validator;
        }

        function getJsExpressionValidatorObject(schemaValidatorObject) {

            var validator = new Validator('"' + schemaValidatorObject.message + '"',
                function(viewValue, modelValue, elementScope) {

                    var val = getFieldValueToValidate(viewValue, modelValue, elementScope);

                    if (elementScope.options && elementScope.options.data
                        && elementScope.options.data.id) {
                        var fields =
                            service.extractQuestionIds(schemaValidatorObject.failsWhenExpression,
                                CurrentLoadedFormService.questionMap);
                        addToListenersMetadata(elementScope.options.data.id, fields);
                    }

                    var referencedQuestions =
                        service.extractQuestionIds(schemaValidatorObject.failsWhenExpression,
                            CurrentLoadedFormService.questionMap);

                    var keyValue = {};

                    _.each(referencedQuestions, function(qId) {
                        if (keyValue[qId] === undefined) {
                            var referenceQuestionkey =
                                CurrentLoadedFormService.getFieldKeyFromGlobalById(qId);
                            var referenceQuestionCurrentValue =
                                CurrentLoadedFormService.
                                    getAnswerByQuestionKey(CurrentLoadedFormService.formModel,
                                    referenceQuestionkey);
                            keyValue[qId] = referenceQuestionCurrentValue;
                        }
                    });

                    var expressionToEvaluate =
                        service.
                            replaceQuestionsPlaceholdersWithValue(schemaValidatorObject.failsWhenExpression,
                            keyValue);

                    expressionToEvaluate =
                        service.replaceMyValuePlaceholdersWithActualValue(expressionToEvaluate, val);
                    console.log('Evaluates val', val);
                    console.log('Evaluates model', elementScope);
                    console.log('expressionToEvaluate', expressionToEvaluate);

                    var isInvalid = service.evaluateExpression(expressionToEvaluate);

                    console.log('isInvalid', isInvalid);

                    return !isInvalid;
                });
            return validator;

        }


        function getFieldValueToValidate(viewValue, modelValue, elementScope) {
            var val = modelValue || viewValue;

            //special case for multicheck box
            if (elementScope.$parent && elementScope.$parent.multiCheckbox) {
                console.log('validating multicheck box..', elementScope.$parent.multiCheckbox);
                var selectedOptions =
                    elementScope.$parent.model[elementScope.$parent.options.key];
                var mergedOptions = selectedOptions ? [].concat(selectedOptions) : [];

                if (val === true) {
                    if (elementScope.option.value) {
                        mergedOptions.push(elementScope.option.value);
                    }
                }
                else {
                    var index = mergedOptions.indexOf(elementScope.option.value);
                    if (index >= 0) {
                        mergedOptions = _.without(mergedOptions, elementScope.option.value);
                    }
                }

                val = mergedOptions;
            }

            return val;
        }

        function getConditionalAnsweredValidatorObject(schemaValidatorObject) {
            var validator = new Validator('"' + schemaValidatorObject.message + '"',
                function(viewValue, modelValue, elementScope) {
                    var val = modelValue || viewValue;

                    if (elementScope.options && elementScope.options.data
                        && elementScope.options.data.id) {
                        var fields = [schemaValidatorObject.referenceQuestionId];
                        addToListenersMetadata(elementScope.options.data.id, fields);
                    }

                    if (val === true && elementScope.$parent && elementScope.$parent.multiCheckbox) {
                        val = elementScope.option.value;
                    }
                    var modelOptions;
                    if (elementScope.$parent && elementScope.$parent.multiCheckbox) {
                        modelOptions = elementScope.$parent.model[elementScope.$parent.options.key];
                    }

                    var modelIsNonEmptyArray =
                        (modelOptions !== undefined && Array.isArray(modelOptions) &&
                            modelOptions.length !== 0);

                    var hasValue = modelIsNonEmptyArray ||
                        (val !== undefined && val !== null && val !== '' && val !== false);
                    if (!hasValue) {
                        //question was not answered therefore it is always valid
                        return true;
                    }

                    //question was asnwered, therefore establish that the reference questions have the required answers
                    var referenceQuestionkey =
                        CurrentLoadedFormService.
                            getFieldKeyFromGlobalById(schemaValidatorObject.referenceQuestionId);
                    var referenceQuestionCurrentValue =
                        CurrentLoadedFormService.
                            getAnswerByQuestionKey(CurrentLoadedFormService.formModel,
                            referenceQuestionkey);



                    var answersThatPermitThisQuestionAnswered =
                        schemaValidatorObject.referenceQuestionAnswers;

                    var isValid = false;

                    _.each(answersThatPermitThisQuestionAnswered, function(answer) {
                        if (referenceQuestionCurrentValue === answer) {
                            isValid = true;
                        }
                    });

                    console.log('isValid', isValid);
                    return isValid;
                });

            return validator;
        }

        function getConditionalRequiredExpressionFunction(schemaValidatorObject) {

            return function($viewValue, $modelValue, scope, element) {
                var i = 0;
                var isRequired;
                var result;

                var referenceQuestionkey =
                    CurrentLoadedFormService.
                        getFieldKeyFromGlobalById(schemaValidatorObject.referenceQuestionId);

                if (scope.options && scope.options.data && scope.options.data.id) {
                    var fields = [schemaValidatorObject.referenceQuestionId];
                    addToListenersMetadata(scope.options.data.id, fields);
                }

                _.each(schemaValidatorObject.referenceQuestionAnswers, function(val) {

                    var referencedQuestionCurrentAnswer =
                        CurrentLoadedFormService.
                            getAnswerByQuestionKey(CurrentLoadedFormService.formModel,
                            referenceQuestionkey);
                    result = referencedQuestionCurrentAnswer === val;

                    if (i === 0) {
                        isRequired = result;
                    }
                    else {
                        isRequired = isRequired || result;
                    }
                    i = i + 1;
                });
                console.log('isRequired', isRequired);
                // if(scope.to.required === undefined){
                //   scope.to.required = isRequired;
                // }
                return isRequired;
            };

        }

        function getHideDisableStructuredFunction(params) {
            var result;
            var results;



            return (function($viewValue, $modelValue, scope, element) {
                //if element is undefined then we are looking for a disable expression
                //if element is defined then we are looking for a hide expression

                var i = 0;
                var fkey;



                if (params.field === 'gender' || params.field === 'sex') {
                    fkey = 'sex';
                }
                else {
                    fkey = CurrentLoadedFormService.getFieldKeyById(params.field, scope.fields);
                }

                fkey = fkey.split('.')[0];

                _.each(params.value, function(val) {
                    result = scope.model[fkey].value !== val;
                    if (i === 0) results = result;
                    else results = results && result;
                    i = i + 1;

                });

                if (results === true) {
                    if (element) {
                        //case hide
                        CurrentLoadedFormService.clearQuestionValueByKey(scope.model, element.options.key.split('.')[0]);
                    }
                    else {
                        //case disable
                        CurrentLoadedFormService.clearQuestionValueByKey(scope.model, scope.options.key.split('.')[0]);
                    }
                }
                console.log('hide/disable', results);
                return results;
            });
        }



        function getHideDisableExpressionFunction_JS(schemaValidatorObject) {
            if (schemaValidatorObject.field && schemaValidatorObject.value) {
                return getHideDisableStructuredFunction(schemaValidatorObject);
            }
            return function($viewValue, $modelValue, scope, element) {
                var val = getFieldValueToValidate($viewValue, $modelValue, scope || element);

                var options = (element ? element.options : undefined) || scope.options;
                if (options && options.data && options.data.id) {
                    var fields =
                        service.extractQuestionIds(schemaValidatorObject.disableWhenExpression ||
                            schemaValidatorObject.hideWhenExpression,
                            CurrentLoadedFormService.questionMap);

                    addToListenersMetadata(options.data.id, fields);
                }

                var referencedQuestions =
                    service.extractQuestionIds(schemaValidatorObject.disableWhenExpression ||
                        schemaValidatorObject.hideWhenExpression,
                        CurrentLoadedFormService.questionMap);

                var keyValue = {};

                _.each(referencedQuestions, function(qId) {
                    if (keyValue[qId] === undefined) {
                        var referenceQuestionkey =
                            CurrentLoadedFormService.getFieldKeyFromGlobalById(qId);

                        var referenceQuestionCurrentValue =
                            CurrentLoadedFormService.
                                getAnswerByQuestionKey(CurrentLoadedFormService.formModel,
                                referenceQuestionkey);

                        keyValue[qId] = referenceQuestionCurrentValue;
                    }
                });

                var expressionToEvaluate =
                    service.
                        replaceQuestionsPlaceholdersWithValue(schemaValidatorObject.disableWhenExpression ||
                        schemaValidatorObject.hideWhenExpression, keyValue);

                expressionToEvaluate =
                    service.replaceMyValuePlaceholdersWithActualValue(expressionToEvaluate, val);
                console.log('Evaluates val', val);
                console.log('Evaluates model', scope);
                console.log('expressionToEvaluate', expressionToEvaluate);

                var isDisabled = service.evaluateExpression(expressionToEvaluate);

                console.log('isDisabled/isHidden', isDisabled);

                if (isDisabled === true) {
                    if (element) {
                        //case hide
                        if (element.options)
                            CurrentLoadedFormService.clearQuestionValueByKey(CurrentLoadedFormService.formModel,
                                element.options.key.split('.')[0]);
                    }
                    else {
                        //case disable
                        CurrentLoadedFormService.clearQuestionValueByKey(scope.model,
                            scope.options.key.split('.')[0]);
                    }
                }
                
                if(element && element.options && element.options.data && element.options.data.historicalField) {
                     element.options.data.historicalField.hide = isDisabled;
                }
                
                return isDisabled;
            };
        }

        function getCalculateExpressionFunction_JS(schemaValidatorObject) {
            return function($viewValue, $modelValue, scope, element) {
                var val = getFieldValueToValidate($viewValue, $modelValue, scope);

                if (scope.options && scope.options.data && scope.options.data.id) {
                    var fields =
                        service.extractQuestionIds(schemaValidatorObject.calculateExpression ||
                            schemaValidatorObject.hideWhenExpression,
                            CurrentLoadedFormService.questionMap);

                    addToListenersMetadata(scope.options.data.id, fields);
                }

                var referencedQuestions =
                    service.extractQuestionIds(schemaValidatorObject.calculateExpression ||
                        schemaValidatorObject.hideWhenExpression,
                        CurrentLoadedFormService.questionMap);

                var keyValue = {};

                _.each(referencedQuestions, function(qId) {
                    if (keyValue[qId] === undefined) {
                        var referenceQuestionkey =
                            CurrentLoadedFormService.getFieldKeyFromGlobalById(qId);

                        var referenceQuestionCurrentValue =
                            CurrentLoadedFormService.
                                getAnswerByQuestionKey(CurrentLoadedFormService.formModel,
                                referenceQuestionkey);

                        keyValue[qId] = referenceQuestionCurrentValue;
                    }
                });

                var expressionToEvaluate =
                    service.
                        replaceQuestionsPlaceholdersWithValue(schemaValidatorObject.calculateExpression ||
                        schemaValidatorObject.hideWhenExpression, keyValue);

                expressionToEvaluate =
                    service.replaceMyValuePlaceholdersWithActualValue(expressionToEvaluate, val);
                console.log('Evaluates val', val);
                console.log('Evaluates model', scope);
                console.log('expressionToEvaluate', expressionToEvaluate);

                var result = service.evaluateExpression(expressionToEvaluate);
                console.log('Evaluates Results', result);
                scope.options.value(result);
            };
        }

        function addToListenersMetadata(listenerId, fieldsIds) {
            _.each(fieldsIds, function(fieldId) {
                if (CurrentLoadedFormService.listenersMetadata[fieldId] === undefined) {
                    console.log('adding listeners entry', fieldId);
                    CurrentLoadedFormService.listenersMetadata[fieldId] = [];
                }
                if (CurrentLoadedFormService.listenersMetadata[fieldId].indexOf(listenerId) < 0) {
                    console.log('adding to listeners', listenerId);
                    CurrentLoadedFormService.listenersMetadata[fieldId].push(listenerId);
                }
                console.log('listeners', CurrentLoadedFormService.listenersMetadata);
            });
        }

        function updateListeners(fieldId) {
            if (CurrentLoadedFormService.listenersMetadata[fieldId] !== undefined) {
                _.each(CurrentLoadedFormService.listenersMetadata[fieldId], function(listenerId) {
                    var fields = CurrentLoadedFormService.questionMap[listenerId];

                    if (Array.isArray(fields)) {
                        _.each(fields, function(field) {
                            if (field.runExpressions) {
                                field.runExpressions();
                                if (typeof field.hideExpression === 'function') {
                                    field.hide = field.hideExpression(field.formControl.$viewValue, field.formControl.$modelValue, field, { options: field });
                                }
                            } else if (typeof field.hideExpression === 'function') {
                                field.hide = field.hideExpression(undefined, undefined, undefined, { options: field });
                            }
                            if (field.formControl) {
                                field.formControl.$validate();
                            }

                        });
                    }
                    else {
                        if (fields.runExpressions) {
                            fields.runExpressions();
                            if (typeof field.hideExpression === 'function') {
                                field.hide = field.hideExpression(field.formControl.$viewValue, field.formControl.$modelValue, field, { options: field });
                            }
                        } else if (typeof field.hideExpression === 'function') {
                            field.hide = field.hideExpression(undefined, undefined, undefined, { options: field });
                        }
                        if (fields.formControl) {
                            fields.formControl.$validate();
                        }

                    }

                });
            }
        }


        function Validator(message, expressionFunction) {
            this.message = message;
            this.expression = expressionFunction;
        }

        function replaceQuestionsPlaceholdersWithValue(expression, keyValuObject) {
            var fieldIds = Object.keys(keyValuObject);
            var replaced = expression;
            _.each(fieldIds, function(key) {
                var toReplace = keyValuObject[key];
                if (typeof keyValuObject[key] === 'string') {
                    toReplace = '"' + toReplace + '"';
                }

                if (Object.prototype.toString.call(keyValuObject[key]) === '[object Date]') {
                    toReplace = '"' + toReplace.toISOString() + '"';
                }

                if (Array.isArray(keyValuObject[key])) {
                    toReplace = convertArrayToString(toReplace);
                }

                var beforeReplaced = replaced;

                replaced = replaced.replace(key, toReplace);

                while (replaced.localeCompare(beforeReplaced) !== 0) {
                    beforeReplaced = replaced;
                    replaced = replaced.replace(key, toReplace);
                }
            });
            return replaced;
        }

        function replaceMyValuePlaceholdersWithActualValue(expression, myValue) {
            var replaced = expression;
            var toReplace = myValue;
            if (typeof toReplace === 'string') {
                toReplace = '"' + toReplace + '"';
            }
            if (Array.isArray(toReplace)) {
                toReplace = convertArrayToString(toReplace);
            }

            if (Object.prototype.toString.call(toReplace) === '[object Date]') {
                toReplace = '"' + toReplace.toISOString() + '"';
            }


            var beforeReplaced = replaced;
            replaced = replaced.replace('myValue', toReplace);
            while (replaced.localeCompare(beforeReplaced) !== 0) {
                beforeReplaced = replaced;
                replaced = replaced.replace('myValue', toReplace);
            }
            return replaced;
        }

        function extractQuestionIds(expression, questionMap) {
            var fieldIds = Object.keys(questionMap);
            var extracted = [];
            _.each(fieldIds, function(key) {
                var findResult = expression.search(key);
                if (findResult !== -1) {
                    extracted.push(key);
                }
            });

            return extracted;
        }


        function evaluateExpression(expression) {
            return eval(expression);
        }

        function convertArrayToString(array) {
            var converted = '[';
            for (var i = 0; i < array.length; i++) {
                if (i !== 0) {
                    converted = converted + ",";
                }
                converted = converted + "'" + array[i] + "'";
            }
            converted = converted + ']';
            return converted;
        }

        function calcBMI(height, weight) {
            var r;
            if (height && weight) {
                r = (weight / (height / 100 * height / 100)).toFixed(1);
            }
            return height && weight ? parseFloat(r) : null
        }

        function isEmpty(val) {

            if (val === undefined || val === null || val === '' || val === 'null'
                || val === 'undefined') {
                return true;
            }
            if (Array.isArray(val) && val.length === 0) {
                return true;
            }
            return false;
        }

        function arrayContains(array, members) {
            if (Array.isArray(members)) {
                if (members.length === 0) {
                    return true;
                }
                var contains = true;
                _.each(members, function(val) {
                    if (array.indexOf(val) === -1) {
                        contains = false;
                    }
                });
                return contains;
            }
            else {
                return array.indexOf(members) !== -1;
            }
        }

        function formatDate(value, format, offset) {
            var format = format || 'yyyy-MM-dd';
            var offset = offset || '+0300';

            if (!(value instanceof Date)) {
                value = new Date(value);
                if (value === null || value === undefined) {
                    throw new Exception('DateFormatException: value passed ' +
                        'is not a valid date');
                }
            }
            return $filter('date')(value, format, offset);
        }

        function arrayContainsAny(array, members) {
            if (Array.isArray(members)) {
                if (members.length === 0) {
                    return true;
                }
                var contains = false;
                _.each(members, function(val) {
                    if (array.indexOf(val) !== -1) {
                        contains = true;
                    }
                });
                return contains;
            }
            else {
                return array.indexOf(members) !== -1;
            }
        }

    }
})();

/*
jshint -W098, -W003, -W068, -W004, -W033, -W030, -W117, -W069, -W106, -W026
*/
/*
jscs:disable disallowMixedSpacesAndTabs, requireDotNotation, requirePaddingNewLinesBeforeLineComments, requireTrailingComma
*/
(function () {
    'use strict';

    angular
        .module('openmrs.angularFormentry')
        .factory('PersonAttributesProcessorService', PersonAttributesProcessorService);

    PersonAttributesProcessorService.$inject = ['$filter', '$log'];

    function PersonAttributesProcessorService($filter, $log) {
        var service = {
            generatePersonAttributesPayload: generatePersonAttributesPayload,
            addExistingPersonAttributesToForm: addExistingPersonAttributesToForm
        };

        return service;

        function generatePersonAttributesPayload(model) {
            return _getSections(model);
        }


        function _getSections(model) {
            var attributeRestPayload = [];
            var sectionKeys = Object.keys(model);
            _.each(sectionKeys, function (section) {
                var sectionModel = model[section];
                _generateSectionPayLoad(sectionModel, attributeRestPayload);
            });

            return attributeRestPayload;
        }

        function _generateSectionPayLoad(sectionModel, personAttributeRestPayload) {
            _.each(sectionModel, function (field) {
                if (field.attributeType !== '' && !_.isNull(field.attributeType) && !_.isUndefined(field.attributeType)) {
                    _addFieldToPayload(field, personAttributeRestPayload);
                }

            });
        }

        function _setValue(field) {
            var attribute = {};
            var initialValue = field.initialValue;
            var value = field.value;

            if (_.isUndefined(initialValue) && (!_.isNull(value) && value !== '' && !_.isUndefined(value))) {

                attribute = {
                    attributeType: field.attributeType,
                    hydratedObject:value
                };

            } else if (initialValue !== value && (!_.isNull(value) &&
                value !== '' && !_.isUndefined(value))) {
                attribute = {
                    uuid: field.initialUuid,
                    attributeType: field.attributeType,
                    hydratedObject:value
                };
            }

            return attribute;
        }

        function _addFieldToPayload(field, personAttributeRestPayload) {
            var personAttribute = {};
            if (angular.isDefined(field.attributeType)) {
                personAttribute = _setValue(field);
                if (Object.keys(personAttribute).length > 0) {
                    personAttributeRestPayload.push(personAttribute);
                }
            }
        }

        function addExistingPersonAttributesToForm(restDataSet, model) {
            _addExistingPersonAttributesToSections(restDataSet, model);
        }

        function getPersonAttributeValue(personAttributes, formlyFieldkey) {
            var attributeType = formlyFieldkey.split('_')[1].replace(/n/gi, '-');
            var filteredPersonAttributes = _.filter(personAttributes, function (attribute_) {
                if (personAttributes !== undefined && angular.isDefined(attribute_.attributeType)) {
                    if (attribute_.attributeType === attributeType) {
                        return attribute_.value;
                    }
                }
            });

            if (filteredPersonAttributes.length > 1) {
                $log.debug('The person attribute ' + filteredPersonAttributes + 'has multiple values, one value is expected');
            }

            return filteredPersonAttributes;
        }

        function _addPersonAttributeToField(field, existingPersonAttribute) {
            if (angular.isDefined(existingPersonAttribute) && existingPersonAttribute.length>0) {
               field.initialValue = existingPersonAttribute[0].value.uuid;
               field.value = existingPersonAttribute[0].value.uuid;
               field.initialUuid = existingPersonAttribute.uuid;
            }

            return field;
        }


        function _addPersonAttributesToSection(restDataSet, sectionModel) {
            var fieldKeys = typeof sectionModel === 'object'? Object.keys(sectionModel):'';
            _.each(fieldKeys, function (fieldKey) {
                if (fieldKey.startsWith('personAttribute')) {
                    var field = sectionModel[fieldKey];
                    var existingPersonAttribute = getPersonAttributeValue(restDataSet, fieldKey);
                    _addPersonAttributeToField(field, existingPersonAttribute);
                }
            });
        }

        function _addExistingPersonAttributesToSections(restDataSet, model) {
            var sectionKeys = Object.keys(model);
            _.each(sectionKeys, function (section) {
                var sectionModel = model[section];
                _addPersonAttributesToSection(restDataSet, sectionModel);
            });
        }


    }
})();

/*
jshint -W098, -W003, -W068, -W004, -W033, -W030, -W117, -W069, -W106, -W026
jscs:disable disallowMixedSpacesAndTabs, requireDotNotation
jscs:disable requirePaddingNewLinesBeforeLineComments, requireTrailingComma
*/
(function () {
    'use strict';

    angular
        .module('openmrs.angularFormentry')
        .factory('EncounterProcessorService', EncounterProcessor);

    EncounterProcessor.$inject = [
        'FormentryUtilService',
        'ObsProcessorService',
        'OrderProcessorService',
        '$log'
    ];

    var UNKNOWN_ROLE_UUID = 'a0b03050-c99b-11e0-9572-0800200c9a66';
    function EncounterProcessor(utils, obsProcessor, orderProcessor, $log) {
        var service = {
            generateEncounterPayload: generateEncounterPayload,
            populateModel: populateModel
        };

        return service;

        function generateEncounterPayload(model) {
            var payload = {};
            var encDetails = _findEncounterDetailsInModel(model);

            if (encDetails.encLocation === null && encDetails.encProvider === null
                && encDetails.encDatetime === null) {
                throw new Error('NoneEncounterForm', 'The passed model is not encounter based');
                $log.debug(model);
            } else {
                if (encDetails.encDatetime !== null) {
                    payload.encounterDatetime =
                        utils.formatDate(encDetails.encDatetime.value, null, '+0300');
                }
                if (encDetails.encLocation !== null) {
                    payload.location = encDetails.encLocation.value;
                }

                // Create encounterProviders (Assume one for now)
                var providerObject;
                if (encDetails.encProvider !== null) {
                    payload.provider = encDetails.encProvider.value;
                    providerObject = encDetails.encProvider.valueObject;
                }

                if (model.form_info) {
                    if (model.form_info.encounterType) {
                        payload.encounterType = model.form_info.encounterType;
                    }
                    if (model.form_info.form) {
                        payload.form = model.form_info.form;
                    }
                }
                //Add obs if any
                var obsPayload = obsProcessor.generateObsPayload(model);

                if (obsPayload !== null && !(_.isEmpty(obsPayload))) {
                    payload.obs = obsPayload;
                }

                //orderProcessor
                var ordersPayload = orderProcessor.generateOrderPayload(model);

                if (ordersPayload !== null && !_.isEmpty(ordersPayload) && ordersPayload.encounterAppendableOrderPayload.length > 0) {
                    payload.orders = ordersPayload.encounterAppendableOrderPayload;

                    _.each(payload.orders, function (order) {
                        if (order.orderer === undefined || order.orderer === null && !order.uuid) {
                            orderProcessor.populatePayloadProvider(order, providerObject.uuId());
                        }
                    });
                }
                //Call the call back if provided
                console.log('payload ;;;', payload);
                return payload;
            }
        }

        function populateModel(model, openmrsRestObj) {
            if (!model || !openmrsRestObj) return;

            var details = _findEncounterDetailsInModel(model);
            //Search for encounterDatetime in the OpenmrsRestObj
            if (_.has(openmrsRestObj, 'encounterDatetime') && details.encDatetime) {
                details.encDatetime.value = openmrsRestObj['encounterDatetime'];
            }

            if (_.has(openmrsRestObj, 'location') && details.encLocation) {
                details.encLocation.value = openmrsRestObj['location'].uuid;
            }

            if (_.has(openmrsRestObj, 'encounterProvider') && details.encProvider) {
                // Take the first provider in the array [Usually it is one anyway]
                details.encProvider.value = openmrsRestObj['encounterProvider'][0].uuid;
            } else if (_.has(openmrsRestObj, 'provider') && details.encProvider) {
                details.encProvider.value = openmrsRestObj['provider'].uuid;
            }

            // Populate obs if any
            obsProcessor.addExistingObsSetToForm(model, openmrsRestObj);

            // populate orders if any
            orderProcessor.populateModel(model, openmrsRestObj);
        }

        function _findEncounterDetailsInModel(model) {
            // Find encounter Details questions
            var details = {
                encDatetime: null,
                encLocation: null,
                encProvider: null
            };

            for (var section in model) {
                if (_.has(model[section], 'encounterDate') ||
                    _.has(model[section], 'encounterDatetime')) {
                    details.encDatetime = model[section].encounterDatetime
                        || model[section].encounterDate;
                }
                if (_.has(model[section], 'encounterLocation')) {
                    details.encLocation = model[section].encounterLocation;
                }
                if (_.has(model[section], 'encounterProvider')) {
                    details.encProvider = model[section].encounterProvider;
                }

                if (details.encDatetime && details.encLocation && details.encProvider) {
                    break;
                }
            }
            return details;
        }
    }
})();

/* global angular */
(function () {
    'use strict';

    angular
        .module('openmrs.angularFormentry')
        .service('HistoricalFieldHelperService', HistoricalFieldHelperService);

    HistoricalFieldHelperService.$inject = ['$log'];
    function HistoricalFieldHelperService($log) {


        var service = {
            //field model blueprint functions
            createModelForRegularField: createModelForRegularField,
            createModelForGroupSection: createModelForGroupSection,

            //field value setters
            fillPrimitiveValue: fillPrimitiveValue,
            fillArrayOfPrimitives: fillArrayOfPrimitives,
            fillGroups: fillGroups,

            //get display text given a field value
            getDisplayText: getDisplayText,
            getDisplayTextFromOptions: getDisplayTextFromOptions,

            //handle field properties for historical data
            handleHistoricalExpressionProperty: handleHistoricalExpressionProperty,
            handleModelBluePrintFunctionForGroupsProperty: handleModelBluePrintFunctionForGroupsProperty,
            handleGetDisplayValueFunctionForGroupsProperty: handleGetDisplayValueFunctionForGroupsProperty,

            //historic display fields
            createHistoricalTextField: createHistoricalTextField
        };

        return service;

        function createHistoricalTextField(parentField, parentFieldModel, parentFieldKey, prepopulateValue) {
            
            var field =  {
                key: 'historical-text-val',
                type: 'historical-text',
                templateOptions: {
                    parentFieldKey: parentFieldKey,
                    parentFieldModel: parentFieldModel,
                    parentField: parentField,
                    prepopulate: prepopulateValue
                }
            };
            
            parentField.data['historicalField'] = field;
            return field;
        }

        function handleHistoricalExpressionProperty(field, schemaQuestion) {
            if (schemaQuestion.historicalExpression) {
                field['templateOptions']['historicalExpression'] = schemaQuestion.historicalExpression;
            }
        }

        function handleGetDisplayValueFunctionForGroupsProperty(field, schemaQuestion) {
            if (field.fieldGroup) {
                field['templateOptions']['getDisplayValue'] =
                _getDisplayValueFunctionForGroup(field, schemaQuestion);
            }
            else {
                field['templateOptions']['getDisplayValue'] =
                _getDisplayValueFunctionForRepeatingGroup(field, schemaQuestion);
            }

        }

        function _getDisplayValueFunctionForRepeatingGroup(obsField, schemaQuestion) {
            return function (values, callback, skipDelimiters) {
                var displayText = '';
                _.each(values, function (value) {

                    if(skipDelimiters !== true)
                        displayText = displayText+ "[ ";

                    _.each(obsField.templateOptions.fields, function (field) {
                        _.each(field.fieldGroup, function (innerfield) {
                            if (innerfield.templateOptions &&
                                typeof innerfield.templateOptions.getDisplayValue === 'function') {
                                innerfield.templateOptions.getDisplayValue(
                                    value[innerfield.data.concept],
                                    function (display) {
                                        displayText = displayText + display + ', ';
                                    }, true);
                            }
                        });
                    });
                    displayText = displayText.trim();
                    displayText = displayText.replace(/,(?=[^,]*$)/, '');
                     if(skipDelimiters !== true)
                        displayText = displayText + " ] ";
                });
                callback(displayText);
            };
        }

        function _getDisplayValueFunctionForGroup(obsField, schemaQuestion) {
            return function (values, callback) {
                var displayText = '';
                _.each(values, function (value) {
                    _.each(obsField.fieldGroup, function (field) {
                        if (field.templateOptions &&
                            typeof field.templateOptions.getDisplayValue === 'function') {
                            field.templateOptions.getDisplayValue(
                                value[field.data.concept],
                                function (display) {
                                    displayText = displayText + display + ', ';
                                });
                        }
                    });
                });
                displayText = displayText.trim();
                displayText = displayText.replace(/,(?=[^,]*$)/, '');
                callback(displayText);
            };
        }

        function handleModelBluePrintFunctionForGroupsProperty(field, schemaQuestion) {
            if (field.fieldGroup) {
                field['templateOptions']['createModelBluePrint'] =
                _getModelBluePrintFunctionForGroups(field, schemaQuestion);
            }
            else {
                field['templateOptions']['createModelBluePrint'] =
                _getModelBluePrintFunctionForRepeatingGroups(field, schemaQuestion);
            }

        }

        function _getModelBluePrintFunctionForGroups(obsField, schemaQuestion) {
            return function (parentModel, value) {
                var groupModel = createModelForGroupSection(parentModel,
                    obsField.key, schemaQuestion, schemaQuestion.questionOptions.concept);

                _.each(obsField.fieldGroup, function (field) {
                    if (field.templateOptions &&
                        typeof field.templateOptions.createModelBluePrint === 'function') {
                        field.templateOptions.createModelBluePrint(groupModel,
                            value?value[0][field.data.concept]:null);
                    }
                });
                return groupModel;
            };
        }

        function _getModelBluePrintFunctionForRepeatingGroups(obsField, schemaQuestion) {
            return function (parentModel, values) {
                var repeatingGroupModel = [];
                _.each(values, function (value) {

                    var groupModel = createModelForGroupSection(null,
                        obsField.key, schemaQuestion, schemaQuestion.questionOptions.concept);
                    _.each(obsField.templateOptions.fields, function (field) {
                        _.each(field.fieldGroup, function (innerfield) {
                            if (innerfield.templateOptions &&
                                typeof innerfield.templateOptions.createModelBluePrint === 'function') {
                                innerfield.templateOptions.createModelBluePrint(groupModel,
                                    value[innerfield.data.concept]);
                            }
                        });
                    });
                    repeatingGroupModel.push(groupModel);
                });
                if (parentModel) {
                    parentModel[obsField.key] = repeatingGroupModel;
                }
                return repeatingGroupModel;
            };
        }


        //#region Functions to create model chunks for a particular fields

        function createModelForRegularField(parentModel, modelKey, schemaQuestion, concept, value) {

            var model = {
                concept: schemaQuestion.questionOptions.concept,
                schemaQuestion: schemaQuestion,
                value: value
            };

            if (parentModel !== null && parentModel !== undefined) {
                var effectiveKey = modelKey.split('.')[0];
                parentModel[effectiveKey || modelKey] = model;
            }

            return model;
        }

        function createModelForGroupSection(parentModel, modelKey, schemaQuestion, concept) {
            var model = {
                groupConcept: schemaQuestion.questionOptions.concept,
                schemaQuestion: schemaQuestion
            };

            if (parentModel !== null && parentModel !== undefined) {
                parentModel[modelKey] = model;
            }

            return model;
        }

        //#endregion

        //#region Functions to handle setting of values and display
        function fillPrimitiveValue(field, newValue) {
            field.value(newValue);
        }

        function fillArrayOfPrimitives(field, newValue) {
            field.value(newValue);
        }

        function fillGroups(field, newValue) {
            var parentModel = field.templateOptions.createModelBluePrint(undefined, newValue);
            field.value(parentModel);
        }

        function getDisplayText(value, callback, fieldLabel) {
            callback(value);
        }

        function getDisplayTextFromOptions(value, options, valueProperty,
            displayProperty, callback, fieldLabel) {
            var displayText = '';
            if (angular.isArray(value)) {
                var valueConverted = 0;
                _.each(value, function (val) {
                    _.each(options, function (option) {
                        if (option[valueProperty] === val) {
                            if(valueConverted === 0){
                              displayText = displayText + option[displayProperty];
                            } else {
                            displayText = displayText + ", " + option[displayProperty];
                            }
                            valueConverted++;
                        }
                    });
                });
            } else {
                _.each(options, function (option) {
                    if (option[valueProperty] === value) {
                        displayText = option[displayProperty];
                    }

                });
            }
            callback(displayText);
        }

        //#endregion
    }
})();

/*jshint -W026, -W030, -W106 */
/*jscs:disable disallowMixedSpacesAndTabs, requireDotNotation*/
/*jscs:disable requirePaddingNewLinesBeforeLineComments, requireTrailingComma*/
(function () {
    'use strict';

    angular
        .module('openmrs.angularFormentry')
        .factory('EncounterDataService', EncounterDataService);

    EncounterDataService.$inject = [
        'HistoricalDataService',
        '$log'
    ];

    function EncounterDataService(histData, $log) {
        var service = {
            registerPreviousEncounters: registerPreviousEncounters
        };

        return service;

        function registerPreviousEncounters(name, openmrsEncounters) {
            if (arguments.length < 2) {
                throw new Error('ArgumentsException', 'Two arguments required,' +
                    'name and openmrs rest representation of encounters or ' +
                    'array of encounters');
            }
            // Create the backing object with necessary methods to access Data
            var encStore = {
                data: [],

                getValue: function (key, index) {
                    var index = index || 0;

                    var pathArray = key.split('.');

                    if (pathArray.length > 0) {
                        return getFirstValue(pathArray, encStore.data[index]);
                    }
                    return encStore.data[index][key];
                },

                getAllObjects: function () {
                    return encStore.data;
                },



                getSingleObject: function (index) {
                    var index = index || 0;
                    return encStore.data[index];
                }
            };

            if (Array.isArray(openmrsEncounters)) {
                var group = [];
                _.each(openmrsEncounters, function (encounter) {
                    group.push(__transformEncounter(encounter));
                });
                
                // Sort them in reverse chronological order
                encStore.data = _.sortBy(group, 'encounterDatetime').reverse();
            } else {
                // Assume a single openmrs rest encounter object.
                encStore.data.push(__transformEncounter(openmrsEncounters));
            }

            histData.putObject(name, encStore);
        }
        
        //region: navigation helpers
        function getFirstValue(path, object) {
            var answers = [];

            getAllValues(path, object, answers);
            console.log('foundans', answers);
            if (answers.length > 0) {
                return answers[0];
            }

        }

        function getAllValues(path, object, answers) {

            if (object === undefined || object === null) {
                return;
            }

            if (path.length <= 1) {
                if (object[path[0]] !== undefined && object[path[0]] !== null) {
                    answers.push(object[path[0]]);
                }
                return;
            }

            var newpath = path.splice(1);
            var key = path[0];

            if (angular.isArray(object[key]) && object[key].length > 0) {
                _.each(object[key], function (childObject) {
                    getAllValues(newpath.slice(0), childObject, answers);
                });
            } else {
                getAllValues(newpath.slice(0), object[key], answers);
            }
        }


        function __transformEncounter(encounter) {
            // Transform encounter Level details to key value pairs.
            var prevEncounter = {
                encounterDatetime: encounter.encounterDatetime,
            };

            if (encounter.location && encounter.location.uuid) {
                prevEncounter.location = encounter.location.uuid;
            }

            if (encounter.patient && encounter.patient.uuid) {
                prevEncounter.patient = encounter.patient.uuid;
            }

            if (encounter.form && encounter.form.uuid) {
                prevEncounter.form = encounter.form.uuid;
            }

            if (encounter.encounterType && encounter.encounterType.uuid) {
                prevEncounter.encounterType = encounter.encounterType.uuid;
            }

            var provider = encounter.provider;
            var encProvider = encounter.encounterProviders;

            var providerValue =
                provider ? provider.uuid : encProvider[0].provider.uuid;

            prevEncounter.provider = providerValue; 
            
            // Deal with obs.
            if (encounter.obs) {
                var processedObs = __transformObs(encounter.obs);
                
                // add in individual processed obs to prevEncounter
                _.extend(prevEncounter, processedObs);
            }

            return prevEncounter;
        }

        function __transformObs(obs) {
            if (!obs) return null;

            var obsRep = {};
            if (Array.isArray(obs)) {
                _.each(obs, function (singleObs) {
                    ___augumentObs(obsRep, __transformObs(singleObs));
                });
                return obsRep;
            } else if (obs.groupMembers) {
                var group = {};
                _.each(obs.groupMembers, function (member) {
                    ___augumentObs(group, __transformObs(member));
                });
                
                //Handle already existing data
                if (obsRep[obs.concept.uuid] && Array.isArray(obsRep[obs.concept.uuid])) {
                    obsRep[obs.concept.uuid].push(group);
                } else {
                    obsRep[obs.concept.uuid] = [group];
                }
                return obsRep;
            } else {
                if (typeof obs.value === 'object') {
                    obsRep[obs.concept.uuid] = obs.value.uuid;
                } else {
                    obsRep[obs.concept.uuid] = obs.value;
                }
                return obsRep;
            }

            function ___augumentObs(existing, toAdd) {
                for (var key in toAdd) {
                    if (existing.hasOwnProperty(key)) {
                        //check if not an array yet
                        if (!Array.isArray(existing[key])) {
                            var temp = existing[key];
                            existing[key] = [temp];
                        }
                        
                        // Check whether the incoming is array (for group members)
                        if (Array.isArray(toAdd[key])) {
                            Array.prototype.push.apply(existing[key], toAdd[key]);
                        } else {
                            existing[key].push(toAdd[key]);
                        }
                    } else {
                        existing[key] = toAdd[key];
                    }
                }
                return existing;
            }
        }
    }
})();

/*jshint -W026, -W030, -W106 */
/*jscs:disable disallowMixedSpacesAndTabs, requireDotNotation*/
/*jscs:disable requirePaddingNewLinesBeforeLineComments, requireTrailingComma*/
(function(){
    'use strict';
    
    angular
        .module('openmrs.angularFormentry')
            .service('HistoricalDataService', HistoricalDataService);
            
    HistoricalDataService.$inject = [
        '$log'
    ];
    
    function HistoricalDataService($log) {
        var store = {};
        this.putObject = function(name, object) {
            store[name] = object;
        };
        
        this.getObject = function(name) {
            if(!_.has(store, name)) {
                $log.debug('No object stored under name ' + name);
                return null;
            }
            return store[name];
        };
        
        this.hasKey = function(name){
            return _.has(store, name)? true: false;
        };
        
        this.removeAllObjects = function() {
            store = {};
        };
    }
})();

/*
jshint -W098, -W003, -W068, -W004, -W033, -W030, -W117, -W069, -W106, -W026
*/
/*
jscs:disable disallowMixedSpacesAndTabs, requireDotNotation, requirePaddingNewLinesBeforeLineComments, requireTrailingComma
*/
(function() {
    'use strict';

    angular
        .module('openmrs.angularFormentry')
        .factory('FormentryUtilService', FormentryUtilService);

    FormentryUtilService.$inject = ['$http', '$log', '$resource', '$filter'];

    function FormentryUtilService($http, $log, $resource, $filter) {
        var service = {
            formatDate: formatDate,
            getLocalTimezone: getLocalTimezone,
            getFormSchema: getFormSchema,
            getTestEncounterData: getTestEncounterData,
            getServerUrl: getServerUrl,
            getFormSchemaReferences: getFormSchemaReferences
        };

        return service;

        function getFormSchema(formName, onSuccess, onError) {
            var schema = {};
            // formName = createValidFormName(formName);
            // this should de dropped once we align all forms related issues
            if (formName !== undefined) {
                formName = formName + '.json';
            } else {
                formName = 'test.json';
            }

            var url = 'scripts/formentry/schema/' + formName;
            $http.get(url, { cache: true })
                .success(function(response) {
                    $log.info('getting schema', response);
                    onSuccess(response);
                })
                .error(function(data, status, headers, config) {
                    if (status === 404) { alert('Form Resource not Available. Form name: ' + formName); }
                    onError(data);
                });
        }


        function getFormSchemaReferences(arrayFormNames, onSuccess, onError) {
            var numberOfRequests = arrayFormNames.length;
            var formSchemas = [];
            var hasReturned = false;
            for (var i = 0; i < arrayFormNames.length; i++) {
                var formName = arrayFormNames[i];

                getFormSchema(formName,
                    function(formSchema) {
                        formSchemas.push(formSchema);
                        numberOfRequests--;
                        if (numberOfRequests === 0 && !hasReturned) {
                            hasReturned = true;
                            onSuccess(formSchemas);
                        }
                    }, function(error) {
                        if (!hasReturned) {
                            hasReturned = true;
                            onError(error);
                        }
                    });
            }
        }

        function _getResource() {
            var _server = 'https://test1.ampath.or.ke:8443/amrs/ws/rest/v1/';
            var _customDefaultRep = 'custom:(uuid,encounterDatetime,' +
                'patient:(uuid,uuid),form:(uuid,name),' +
                'location:ref,encounterType:ref,provider:ref,' +
                'obs:(uuid,obsDatetime,concept:(uuid,uuid),value:ref,groupMembers))';

            return $resource(_server + 'encounter/:uuid?v=' + _customDefaultRep,
                { uuid: '@uuid' },
                { query: { method: 'GET', isArray: false } });
        }

        function getTestEncounterData(uuid, successCallback, failedCallback) {
            var testUuid = '2b863113-1996-4562-b246-d23766175d73';
            var resource = _getResource();
            return resource.get({ uuid: testUuid }).$promise
                .then(function(response) {
                    successCallback(response);
                })
                .catch(function(error) {
                    failedCallback('Error processing request', error);
                    $log.error(error);
                });
        }

        function getServerUrl() {
            return 'http://localhost:8080/amrs/ws/rest/v1';
        }

        // Return local timezone in format +0300 for EAT
        function getLocalTimezone() {
            var offset = new Date().getTimezoneOffset();
            var sign;
            if (offset < 0) {
                sign = '+';
            } else {
                sign = '-';
            }

            offset = Math.abs(offset);
            var hours = Math.floor(offset / 60);
            var mins = offset % 60;
            var ret = '';

            if (hours < 10) {
                hours = '0' + hours;
            }

            if (mins < 10) {
                mins = '0' + mins;
            }

            return ret.concat(sign).concat(hours).concat(mins);
        }

        /**
         * Takes three parameters.
         * date: a valid javascript date or string representing a date
         * format: a valid angular date filter format
         * timezone: a timezone in form +0300
         * Return a formatted date.
         */
        function formatDate(date, format, timezone) {
            //console.log('date to be converted ', date);
            if (typeof date === 'string') {
                //Try to parse
                date = new Date(date);
                if (date === undefined) {
                    var message = 'Bad date ' + date + ' passed as parameter';
                    throw new Error(message);
                }
            }

            if (!(date instanceof Date)) {
                throw new ReferenceError('Invalid type passed as date!');
            }

            var format = format || 'YYYY-MM-DD HH:mm:ss';
            var timezone = timezone || getLocalTimezone();

            console.log('timezone', timezone);
            console.log('date', date);
            //console.log('utc date', moment(date).utc());
            var momented = moment(date).utcOffset(timezone);
            console.log('converted', momented);
            console.log('converted formatted', momented.format(format));
            return momented.format(format);
        }
    }
})();

/*
jshint -W098, -W003, -W068, -W004, -W033, -W030, -W117, -W069, -W106, -W026, -W083
*/
/*
jscs:disable disallowMixedSpacesAndTabs, requireDotNotation, requirePaddingNewLinesBeforeLineComments, requireTrailingComma
*/
(function() {
  'use strict';

  angular
        .module('openmrs.angularFormentry')
        .factory('schemaValidatorService', schemaValidatorService);

    schemaValidatorService.$inject = ['$log'];

  function schemaValidatorService($log) {
    var errorLabel = "";
    var pass = true;
    var schemaErrors = [];
      var service = {
          validateSchema: validateSchema
      };

      return service;

      function _isJsonString(str) {
        try {
          JSON.parse(str);
        } catch (e) {
          return false;
        }
        return true;
      }

      function _validateFields (questions) {
        for( var i in questions) {
          var question = questions[i];
          if (question.type === 'obsGroup') {
            pass = _validateField(question);
            _validateFields(question.questions);
          } else {
            pass = _validateField(question);
          }
        }
      }

      function validateSchema(schema) {
          pass = true;
          schemaErrors = [];
          //valid schema type, should be an {}
          if ((!_isJsonString(schema)) && (typeof schema !== 'object')) {
              pass = false;
              $log.error('Form Error: Ensure you schema is a valid json object. Enclose it in {}');
          }
          //validate schema properties
          if (!schema.name || !schema.processor || !schema.pages){
              pass = false;
              $log.error('Form Error: Ensure the schema has name, processor and pages properties. You have provided this ' +
                'schema which is not complete::-->', schema);
                schemaErrors.push({id:"schema",
                error:"schema mising either name, processor or pages properties",
                question:schema
                });
          } else {
              //Validate structure of each properties
              _.each(schema.pages, function (page) {
                  pass = _validatePage(page);
                  _.each(page.sections, function (section) {
                    pass = _validateSection(section);
                    _validateFields (section.questions);
                  });
              });
          }
          console.log('Errors:',schemaErrors);
          return {
            pass: pass,
            errors:schemaErrors
          };
      }

      function _validatePage(page) {
          if(typeof page !== 'object'){
            pass = false;
            errorLabel = "";
            if (page.label) errorLabel = page.label;
            $log.error('Form Error: Your schema page is not an object, You have provided this -->', page);
            $log.error('Form Error: instead it should be an object: {}');
            schemaErrors.push({id:errorLabel?errorLabel:'page',
              error:"schema mising either name, processor or pages properties",
              question:page
            });
          } else {
            if (page.label === undefined) {
              pass = false;
              $log.error('Form Error: Your schema page is missing the label property, You have provided this -->', page);
              $log.error('Form Error: Each page must have a label');
              schemaErrors.push({id:"page",error:"Page label is missing",
              question:page
              });
            }
          }

        if(pass === false) {$log.error('Form Error: Page Validation has Failed');}
        if(pass === true) {$log.info('Form Error: Page Validation has Passed');}
        return pass;
      }

      function _validateSection(section) {
         errorLabel = "";
         if(typeof section !== 'object') {
            pass = false;
            if (section.label) errorLabel = section.label;
            $log.error('Form Error: Your page section is not an object, You have provided this -->', section);
            $log.error('Form Error: instead it should be an object:{}');

            schemaErrors.push({id:errorLabel?errorLabel:'section',
            error:"Your page section is not an object",
            question:section
            });
         } else {
           if(section.questions === undefined) {
             errorLabel = "";
              pass = false;
              if (section.label) errorLabel = section.label;
              $log.error('Form Error: Your page section is not having the questions property, You have provided this -->', section);
              $log.error('Form Error: The Section must have questions property');
              schemaErrors.push({id:errorLabel?errorLabel:'section',
              error:"Missing questions property",
              question:section
              })
           } else {
             if (!_.isArray(section.questions)) {
               pass = false;
               errorLabel = "";
               if (section.label) errorLabel = section.label;
               $log.error('Form Error: Your page section is not having the questions property, You have provided this -->', section);
               $log.error('Form Error: The Section questions property must be an array');
               schemaErrors.push({id:errorLabel?errorLabel:'section',
               error:"Section questions property should be an array",
               question:section
             });
             }
           }

           if(section.label === undefined) {
              pass = false;
              $log.error('Form Error: Your page section is having the label property, You have provided this -->', section);
              $log.error('Form Error: Every Section must have a label property');
              schemaErrors.push({id:'section',
              error:"Section is Missing a label",
              question:section
            });
           }
         }

         if(pass === false) {$log.error('Form Error: Section Validation has Failed');}
         if(pass === true) {$log.info('Form Error: Section Validation has Passed');}
         return pass;
      }

      function _validateField(field) {
          if (typeof field === 'function') {
            $log.info('Skipping functions added by phantomJS during tests')
          }
          else if(typeof field !== 'object') {
            pass = false;
            errorLabel = "";
            if (field.label) errorLabel = field.label;
            $log.error('Form Error: Your section question is not an object, You have provided this -->', field);
            $log.error('Form Error: instead it should be an object:{}');
            schemaErrors.push({id:errorLabel?errorLabel:'field',
            error:"Field should be an Object",
            question:field
            });
          } else {
            if (field.type === undefined) {
              pass = false;
              if (field.label) errorLabel = field.label;
              $log.error('Form Error: Your section question is missing the type property, You have provided this -->', field);
              $log.error('Form Error: Every question must have the type property');
              schemaErrors.push({id:errorLabel?errorLabel:'field',
              error:"Field Missing Type property",
              question:field
              });
            }

            if (field.questionOptions === undefined) {
              pass = false;
              if (field.label) errorLabel = field.label;
              $log.error('Form Error: Your section question is missing the questionOptions property, You have provided this -->', field);
              $log.error('Form Error: Every question must have the questionOptions property property');
              schemaErrors.push({id:errorLabel?errorLabel:'field',
              error:"Field Missing questionOptions property",
              question:field
              });
            } else {
              if (field.questionOptions.rendering === undefined) {
                pass = false;
                if (field.label) errorLabel = field.label;
                $log.error('Form Error: Your section question is missing the questionOptions.rendering property, You have provided this -->', field);
                $log.error('Form Error: Every question must have the questionOptions.rendering property property');
                schemaErrors.push({id:errorLabel?errorLabel:'field',
                error:"Field Missing questionOptions.rendering property",
                question:field
              });
              }

              if (field.type === 'obs') {
                if (field.questionOptions.concept === undefined) {
                  pass = false;
                  if (field.label) errorLabel = field.label;
                  $log.error('Form Error: Your section question is missing the questionOptions.concept property, You have provided this -->', field);
                  $log.error('Form Error: Every question of type obs must have the questionOptions.concept property property');
                  schemaErrors.push({id:errorLabel?errorLabel:'field',
                  error:"Field Missing questionOptions.concept property",
                  question:field
                  });

                }
                if (field.questionOptions.rendering === 'select') {
                  if(field.questionOptions.answers === undefined) {
                    pass = false;
                    if (field.label) errorLabel = field.label;
                    $log.error('Form Error: Your section question is missing the questionOptions.answers property, You have provided this -->', field);
                    $log.error('Form Error: Every question of type obs with select rendering must have the questionOptions.answers property');
                    schemaErrors.push({id:errorLabel?errorLabel:'field',
                    error:"Field Missing questionOptions.answers property",
                    question:field
                    });
                  }
                  if( !_.isArray(field.questionOptions.answers)) {
                    pass = false;
                    if (field.label) errorLabel = field.label;
                    $log.error('Form Error: Answers property is not an array, You have provided this -->', field);
                    $log.error('Form Error: Every answer property for select rendering must be an array');
                    schemaErrors.push({id:errorLabel?errorLabel:'field',
                    error:"QuestionOptions.answers property must be an array",
                    question:field
                    });
                  }
                }
                if (field.label === undefined) {
                  pass = false;
                  if (field.label) errorLabel = field.label;
                  $log.error('Form Error: Your section question is missing the label property, You have provided this -->', field);
                  $log.error('Form Error: Every question of type obs must have the label property property');
                  schemaErrors.push({id:errorLabel?errorLabel:'field',
                  error:"Field Missing label property",
                  question:field
                });
                }
              }
            }
          }
        if(pass === false) {$log.error('Form Error: Field Validation has Failed');}
        if(pass === true) {$log.info('Form Error: Field Validation has Passed');}
        return pass;
      }
  }
})();

/*
 jshint -W098, -W003, -W068, -W004, -W033, -W030, -W117, -W069, -W106, -W026
 jscs:disable disallowMixedSpacesAndTabs, requireDotNotation
 jscs:requirePaddingNewLinesBeforeLineComments, requireTrailingComma
*/

(function () {
    'use strict';
    angular.module('openmrs.angularFormentry')
            .factory('configService', configService);
            
    configService.$inject = [
        '$http',
        '$log',
        'FormentryConfig',
        'formlyConfig',
        '$rootScope',
        '$q'
    ];

    function  configService($http, $log, FormentryConfig, formlyConfig, $rootScope, $q) {
        $rootScope.jsonSchema = [];
        var service = {
            addFieldHandler: addFieldHandler,
            addJsonSchema: addJsonSchema,
            addJsonSchemaSource: addJsonSchemaSource,
            getformlyConfig: getformlyConfig,
            getSchema: getSchema
        };

        return service;
        /**
         *
         * @param {String} fieldHandlerName
         * @param {function} handlerFunction
         * @returns {undefined}
         */
        function  addFieldHandler(fieldHandlerName, handlerFunction) {
            FormentryConfig.registerFieldHandler(fieldHandlerName,
                    handlerFunction);
        }
        
        /**
         *
         * @param {String} schemaKey ,The key allows one  config  object
         * to have different form schemas.adding another schema  source
         * with the same scheme  should  over ride  the  previous schema
         * @param {JsonString} jsonObject
         * @returns {undefined}
         */
        function addJsonSchema(schemaKey, jsonObject) {
            $rootScope.jsonSchema[schemaKey] = jsonObject;
            $rootScope.$broadcast('schemaAdded', {schemaKey: schemaKey, status: true});
        }
        
        /**
         *
         * @param {String} schemaKey ,The key allows one  config  object
         * to have different form schemas.adding another schema  source
         * with the same scheme  should  over ride  the  previous schema
         * @param {String} SourceUrl
         * @param {String} requestMethod ,The method of the request
         * @returns {undefined}
         */
        function addJsonSchemaSource(schemaKey, SourceUrl, requestMethod) {
            var longRequest = $q.defer();
            $http({
                method: requestMethod,
                url: SourceUrl,
                cache: true
            }).then(function successCallback(response) {
                addJsonSchema(schemaKey, response);
                longRequest.resolve(response);
            }, function errorCallback(response) {
                $rootScope.$broadcast('schemaAdded', {schemaKey: schemaKey, status: false});
                longRequest.reject(response);
            });
            return longRequest.promise;
        }
        
        function getSchema(schemaKey) {
            if (angular.isDefined($rootScope.jsonSchema[schemaKey])) {
                return{schema: $rootScope.jsonSchema[schemaKey]};
            } else {
                return {message: 'missing schema', schema: undefined};
            }
        }

        /**
         *
         * @returns {formlyConfigProvider}.This  the default formly  config
         *  object
         */
        function getformlyConfig() {
            return formlyConfig;
        }
    }
})();

/*
jshint -W098, -W003, -W068, -W004, -W033, -W030, -W117, -W069, -W106, -W026
*/
/*
jscs:disable disallowMixedSpacesAndTabs, requireDotNotation, requirePaddingNewLinesBeforeLineComments, requireTrailingComma
*/
(function () {
    'use strict';

    angular
        .module('openmrs.angularFormentry')
        .factory('FormSchemaCompilerService', FormSchemaCompilerService);

    FormSchemaCompilerService.$inject = [];

    function FormSchemaCompilerService(ObsProcessorService, PersonAttributesProcessorService,
        EncounterProcessorService) {
        var service = {
            findSchemaByName: findSchemaByName,
            getReferencedForms: getReferencedForms,
            getPageInSchemaByLabel: getPageInSchemaByLabel,
            getSectionInSchemaByPageLabelBySectionLabel: getSectionInSchemaByPageLabelBySectionLabel,
            getQuestionByIdInSchema: getQuestionByIdInSchema,
            getQuestionsArrayByQuestionIdInSchema: getQuestionsArrayByQuestionIdInSchema,
            getAllPlaceholderObjects: getAllPlaceholderObjects,
            fillPlaceholderObject: fillPlaceholderObject,
            deleteReferenceMember: deleteReferenceMember,
            fillAllPlaceholderObjectsInForm: fillAllPlaceholderObjectsInForm,
            removeObjectFromArray: removeObjectFromArray,
            removeExcludedQuestionsFromPlaceholder: removeExcludedQuestionsFromPlaceholder
        };

        return service;

        function findSchemaByName(schemaArray, nameOfSchema) {
            if (_.isEmpty(schemaArray) || _.isEmpty(nameOfSchema)) {
                return;
            }

            var foundSchema;
            _.each(schemaArray, function (schema) {
                if (schema.name === nameOfSchema) {
                    foundSchema = schema;
                }
            });
            return foundSchema;
        }

        function getPageInSchemaByLabel(schema, pageLabel) {
            if (_.isEmpty(schema) || _.isEmpty(pageLabel)) {
                return;
            }

            var foundPage;
            _.each(schema.pages, function (page) {
                if (page.label === pageLabel) {
                    foundPage = page;
                }
            });
            return foundPage;
        }

        function getSectionInSchemaByPageLabelBySectionLabel(schema, pageLabel, sectionLabel) {
            if (_.isEmpty(schema) || _.isEmpty(pageLabel) || _.isEmpty(sectionLabel)) {
                return;
            }

            var foundPage = getPageInSchemaByLabel(schema, pageLabel);
            if (_.isEmpty(foundPage)) {
                return;
            }

            var foundSection;

            _.each(foundPage.sections, function (section) {
                if (section.label === sectionLabel) {
                    foundSection = section;
                }
            });
            return foundSection;
        }

        function getQuestionByIdInSchema(schema, questionId) {
            if (_.isEmpty(schema) || _.isEmpty(questionId)) {
                return;
            }
            return _getQuestionByIdInSchema(schema, questionId);
        }

        function getQuestionsArrayByQuestionIdInSchema(schema, questionId) {
            if (_.isEmpty(schema) || _.isEmpty(questionId)) {
                return;
            }
            return _getQuestionsArrayByQuestionIdInSchema(schema, schema, questionId);
        }

        function _getQuestionByIdInSchema(object, questionId) {
            if (Array.isArray(object)) {
                //console.debug('is array', object);
                var question;
                for (var i = 0; i < object.length; i++) {
                    if (!_.isEmpty(object[i])) {
                        question = _getQuestionByIdInSchema(object[i], questionId);
                    }
                    if (!_.isEmpty(question)) {
                        break;
                    }
                }
                return question;
            } else if (typeof object === 'object') {
                //console.debug('is object', object);
                if (_isQuestionObjectWithId(object, questionId)) {
                    return object;
                } else if (_isSchemaSubObjectExpandable(object)) {
                    var toExpand = (object.pages || object.sections || object.questions);
                    //console.log('toExpand', toExpand);
                    return _getQuestionByIdInSchema(toExpand, questionId);
                } else {
                    return;
                }
            } else {
                return;
            }
        }

        function _getQuestionsArrayByQuestionIdInSchema(parent, object, questionId) {
            if (Array.isArray(object)) {
                //console.debug('is array', object);
                var returnedValue;
                for (var i = 0; i < object.length; i++) {
                    if (!_.isEmpty(object[i])) {
                        returnedValue = _getQuestionsArrayByQuestionIdInSchema(object, object[i], questionId);
                    }
                    if (!_.isEmpty(returnedValue)) {
                        break;
                    }
                }

                return returnedValue;
            } else if (typeof object === 'object') {
                //console.debug('is object', object);
                if (_isQuestionObjectWithId(object, questionId)) {
                    return parent;
                } else if (_isSchemaSubObjectExpandable(object)) {
                    var toExpand = (object.pages || object.sections || object.questions);
                    //console.log('toExpand', toExpand);
                    return _getQuestionsArrayByQuestionIdInSchema(toExpand, toExpand, questionId);
                } else {
                    return;
                }
            } else {
                return;
            }
        }

        //object is page or section or question
        function _isSchemaSubObjectExpandable(object) {
            if (typeof object === 'object') {
                var objectKeys = Object.keys(object);
                if (_.contains(objectKeys, 'pages') ||
                    _.contains(objectKeys, 'sections') ||
                    _.contains(objectKeys, 'questions')) {
                    //console.log('isExpandable', object);
                    return true;
                }
            }
            return false;
        }

        function _isQuestionObjectWithId(object, id) {
            //console.log('is Question', object);
            if (object.id === id) {
                return true;
            }
            return false;
        }

        function getAllPlaceholderObjects(schema) {
            var referencedObjects = [];
            _getAllPlaceholderObjects(schema, referencedObjects);
            return referencedObjects;
        }

        function _getAllPlaceholderObjects(subSchema, objectsArray) {
            if (_.isEmpty(subSchema)) {
                return;
            }
            if (Array.isArray(subSchema)) {
                for (var i = 0; i < subSchema.length; i++) {
                    if (!_.isEmpty(subSchema[i])) {
                        _getAllPlaceholderObjects(subSchema[i], objectsArray);
                    }
                }
            } else if (typeof subSchema === 'object') {
                //console.log('Examining object', subSchema);
                if (!_.isEmpty(subSchema.reference)) {
                    objectsArray.push(subSchema);
                } else if (_isSchemaSubObjectExpandable(subSchema)) {
                    var toExpand = (subSchema.pages || subSchema.sections || subSchema.questions);
                    _getAllPlaceholderObjects(toExpand, objectsArray);
                }
            }
        }

        function fillPlaceholderObject(placeHolderObject, referenceObject) {

            for (var member in referenceObject) {
                //console.log('examining member', member);
                if (_.isEmpty(placeHolderObject[member])) {
                    //console.log('filling member', placeHolderObject[member]);
                    placeHolderObject[member] = referenceObject[member];
                }
            }
        }

        function deleteReferenceMember(placeHolderObject) {
            delete placeHolderObject['reference'];
        }

        function fillAllPlaceholderObjectsInForm(formSchema, referencedForms) {
            //get all referenced forms 
            var referencedForms = getReferencedForms(formSchema, referencedForms);
            if (_.isEmpty(referencedForms)) {
                return;
            }

            //get all place-holders from the form schema
            var placeHolders = getAllPlaceholderObjects(formSchema);
            if (_.isEmpty(placeHolders)) {
                return;
            }

            //replace all placeHolders
            _replaceAllPlaceholdersWithActualObjects(formSchema, referencedForms, placeHolders);

        }

        function _replaceAllPlaceholdersWithActualObjects(formSchema, keyValReferencedForms, placeHoldersArray) {
            _.each(placeHoldersArray, function (placeHolder) {
                var referencedObject = _getReferencedObject(formSchema, placeHolder.reference, keyValReferencedForms);

                if (_.isEmpty(referencedObject)) {
                    console.error('Form compile: Error finding referenced object', placeHolder.reference);
                } else {
                    //console.log('Form compile: filling placeholder object', placeHolder);
                    //console.log('Form compile: filling placeholder object with', referencedObject);
                    fillPlaceholderObject(placeHolder, referencedObject);
                    removeExcludedQuestionsFromPlaceholder(placeHolder);
                    deleteReferenceMember(placeHolder);
                }
            });
        }

        function removeObjectFromArray(array, object) {
            var indexOfObject = array.indexOf(object);
            if (indexOfObject === -1) return;

            array.splice(indexOfObject, 1);
        }

        function removeExcludedQuestionsFromPlaceholder(placeHolder) {
            if (angular.isArray(placeHolder.reference.excludeQuestions)) {
                _.each(placeHolder.reference.excludeQuestions, function (excludedQuestionId) {
                    var questionsArray = getQuestionsArrayByQuestionIdInSchema(
                        placeHolder, excludedQuestionId);

                    if (!angular.isArray(questionsArray)) return;
                    var question = getQuestionByIdInSchema(questionsArray, excludedQuestionId);

                    removeObjectFromArray(questionsArray, question);
                });
            }
        }

        function _getReferencedObject(formSchema, referenceData, keyValReferencedForms) {
            if (_.isEmpty(referenceData.form)) {
                console.error('Form compile: reference missing form attribute', referenceData);
                return;
            }
            if (_.isEmpty(keyValReferencedForms[referenceData.form])) {
                console.error('Form compile: referenced form alias not found', referenceData);
                return;
            }
            if (!_.isEmpty(referenceData.questionId)) {
                return getQuestionByIdInSchema(keyValReferencedForms[referenceData.form], referenceData.questionId);
            }

            if (!_.isEmpty(referenceData.page) && !_.isEmpty(referenceData.section)) {
                return getSectionInSchemaByPageLabelBySectionLabel(
                    keyValReferencedForms[referenceData.form],
                    referenceData.page,
                    referenceData.section
                );
            }
            if (!_.isEmpty(referenceData.page)) {
                return getPageInSchemaByLabel(
                    keyValReferencedForms[referenceData.form],
                    referenceData.page
                );
            }
            console.error('Form compile: Unsupported reference type', referenceData.reference);
        }

        function getReferencedForms(formSchema, formSchemaLookup) {
            var referencedForms = formSchema.referencedForms;

            if (_.isEmpty(referencedForms)) {
                return;
            }

            var keyValReferencedForms = {};
            if(Array.isArray(formSchemaLookup)) {
              _.each(referencedForms, function (reference) {
                  var referencedFormSchema =
                      findSchemaByName(formSchemaLookup, reference.formName);
                  keyValReferencedForms[reference.alias] = referencedFormSchema;
              });
            } else {
              // Assume it is a key value pair of uuid:schema //i.e this is from
              // openmrs backend
              _.each(referencedForms, function (reference) {
                keyValReferencedForms[reference.alias] = 
                                        formSchemaLookup[reference.ref.uuid];
              })
            }

            return keyValReferencedForms;
        }

    }
})();

(function(){
  'use strict';
  
  angular
    .module('angularFormentry')
      .service('AuthService', AuthService);
    
    AuthService.$inject = [
      '$rootScope'
    ];
    
    function AuthService($rootScope) {
      var _this = this;
      var authData = {
        user: {
          name: null,
        },
        authenticated: false,
        sessionId: null,
      };
      
      _this.authenticated = function(value) {
        if(angular.isDefined(value)) {
          authData.authenticated = value;
        } else {
          return authData.authenticated;
        }
      }
      
      $rootScope.$on('authenticated', function(event, data) {
        if(data.user) {
          if(data.user.name) {
            authData.user.name = data.user.name;
          }
        }
        authData.authenticated = true;
      });
      
      $rootScope.$on('deauthenticated', function() {
        authData.authenticated = false;
      });
    }
})();

(function() {
  'use strict';
  
  angular
    .module('angularFormentry')
      .service('CacheService', CacheService);
      
    CacheService.$inject = [];
    
    function CacheService() {
      var _this = this;
      var cache = {
        forms: []
      };
      
      // will replace already existing value
      _this.put = function(name, value) {
        cache[name] = value;
      };
      
      _this.get = function(name) {
        if(cache.hasOwnProperty(name)) {
          return cache[name];
        }
        return undefined;
      }
      
    }
})();

(function(){
  'use strict';
  
  angular
    .module('app.openmrsFormManager')
      .factory('FormManagerUtil', FormManagerUtil);
    
    FormManagerUtil.$inject = [];
    
    function FormManagerUtil() {
      var service = {
        findResource: findResource
      };
      
      return service;
      
      /**
       * Takes an array of form resources and a needle which can be dataType
       * or name
       * 
       */
      function findResource(formResources, needle) {
        var needle = needle || 'AmpathJsonSchema';
        if(_.isUndefined(formResources) || !Array.isArray(formResources)) {
          throw new Error('Argument should be array of form resources');
        }
        
        needle = needle.toLowerCase();
        return _.find(formResources, function(resource) {
          if(resource.dataType) {
            resource.dataType = resource.dataType.toLowerCase();
          }
          if(resource.name) {
            resource.name = resource.name.toLowerCase();
          }
          return (resource.dataType === needle || resource.name === needle);
        });
      }
    }
})();

/*
jshint -W106, -W098, -W003, -W068, -W004, -W033, -W030, -W117, -W116, -W069, -W026
*/
/*
jscs:disable disallowMixedSpacesAndTabs, requireDotNotation, requirePaddingNewLinesBeforeLineComments, requireTrailingComma
*/
(function() {

    'use strict';

    var mod =
        angular
            .module('openmrs.angularFormentry');

    mod.run(function(formlyConfig) {
        var attributes = [
            'date-disabled',
            'custom-class',
            'show-weeks',
            'starting-day',
            'init-date',
            'min-mode',
            'max-mode',
            'format-day',
            'format-month',
            'format-year',
            'format-day-header',
            'format-day-title',
            'format-month-title',
            'year-range',
            'shortcut-propagation',
            'datepicker-popup',
            'show-button-bar',
            'current-text',
            'clear-text',
            'close-text',
            'close-on-date-selection',
            'datepicker-append-to-body'
        ];

        var bindings = [
            'datepicker-mode',
            'min-date',
            'max-date'
        ];

        var ngModelAttrs = {};

        angular.forEach(attributes, function(attr) {
            ngModelAttrs[camelize(attr)] = { attribute: attr };
        });

        angular.forEach(bindings, function(binding) {
            ngModelAttrs[camelize(binding)] = { bound: binding };
        });

        formlyConfig.setType({
            name: 'datepicker',
            template: '<input class="form-control" ng-model="model[options.key]"  ' +
            'is-open="to.isOpen" ng-click="open($event)"  ' +
            'datepicker-options="to.datepickerOptions" />'+
            '<div ng-if="to.weeksList && to.weeksList.length > 0" class="input-group-btn">' +
            '<button type="button" ng-disabled="to.disabled" class="btn btn-default dropdown-toggle" data-toggle="dropdown" >'+
            'Weeks <span class="caret"></span></button>'+
            '<ul class="dropdown-menu dropdown-menu-right">' +
             '<li ng-repeat="week in to.weeksList"><a ng-click="setByWeeks(week)">{{week}} Weeks</a></li>'+
            '</ul>'+
            '</div>',

            wrapper: ['bootstrapLabel', 'bootstrapHasError'],

            controller: ['$scope', '$log', 'moment', function($scope, $log, moment) {
                $scope.open = function($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    $scope.opened = true;
                };
                
                $scope.setByWeeks = function(week) {
                    var oneMonth = new moment().add(week, 'weeks');
                    $scope.options.value(oneMonth.toDate());
                };

            }],

            overwriteOk: true,

            defaultOptions: {
                ngModelAttrs: ngModelAttrs,
                templateOptions: {

                    addonLeft: {
                        class: 'glyphicon glyphicon-calendar',
                        onClick: function(options, scope) {
                            if (options.templateOptions.disabled !== true) {
                                options.templateOptions.isOpen = !options.templateOptions.isOpen;
                            }
                        }
                    },
                    onFocus: function($viewValue, $modelValue, scope) {
                        scope.to.isOpen = !scope.to.isOpen;
                    },

                    datepickerOptions: {}
                }
            }
        });

        function camelize(string) {
            string = string.replace(/[\-_\s]+(.)?/g, function(match, chr) {
                return chr ? chr.toUpperCase() : '';
            });
            // Ensure 1st char is always lowercase
            return string.replace(/^([A-Z])/, function(match, chr) {
                return chr ? chr.toLowerCase() : '';
            });
        }
    });

})();

/*
jshint -W106, -W098, -W003, -W068, -W004, -W033, -W030, -W117, -W116, -W069, -W026
*/
/*
jscs:disable disallowMixedSpacesAndTabs, requireDotNotation, requirePaddingNewLinesBeforeLineComments, requireTrailingComma
*/
(function() {
    'use strict';

    angular
        .module('openmrs.angularFormentry')
        .run(createDatetimePickerType);

    function createDatetimePickerType(formlyConfig, $filter, $log) {
        $log.info('A new type is being created!!');
        var attributes = [
            'hour-step',
            'minute-step',
            'show-meridian',
            'date-disabled',
            'enable-date',
            'current-text',
            'time-text',
            'date-text',
            'now-text',
            'today-text',
            'clear-text',
            'close-text',
            'close-on-date-selection',
        ];

        var bindings = [
            'datepicker-mode',
            'min-date',
            'max-date',
            'hour-step',
            'minute-step',
            'show-meridian'
        ];

        var ngModelAttrs = {};

        angular.forEach(attributes, function(attr) {
            ngModelAttrs[camelize(attr)] = { attribute: attr };
        });

        angular.forEach(bindings, function(binding) {
            ngModelAttrs[camelize(binding)] = { bound: binding };
        });

        formlyConfig.setType({
            name: 'datetimepicker',
            extends: 'input',
            template: '<input class="form-control" ng-model="model[options.key]" ' +
            'is-open="to.isOpen" ng-click="open($event)"  ' +
            'datetime-picker="dd-MMM-yyyy hh:mm:ss a" ' +
            'datepicker-options="to.datepickerOptions"></input>',
            wrapper: ['bootstrapLabel', 'bootstrapHasError'],
            overwriteOk: true,
            defaultOptions: {
                ngModelAttrs: ngModelAttrs,
                templateOptions: {
                    addonLeft: {
                        class: 'glyphicon glyphicon-calendar',
                        onClick: function(options, scope) {
                            if (options.templateOptions.disabled !== true) {
                                options.templateOptions.isOpen = !options.templateOptions.isOpen;
                            }
                        }
                    },
                    onFocus: function($viewValue, $modelValue, scope) {
                        scope.to.isOpen = !scope.to.isOpen;
                        $log.log('View value: ', $viewValue, 'Model value: ', $modelValue);
                    },

                    datepickerOptions: {},
                    timepickerOptions: {},
                }
            }
        });

        function camelize(string) {
            string = string.replace(/[\-_\s]+(.)?/g, function(match, chr) {
                return chr ? chr.toUpperCase() : '';
            });
            // Ensure 1st char is always lowercase
            return string.replace(/^([A-Z])/, function(match, chr) {
                return chr ? chr.toLowerCase() : '';
            });
        }
    }
})();

/*
jshint -W106, -W098, -W109, -W003, -W068, -W004, -W033, -W030, -W117, -W116, -W069, -W026
*/
/*
jscs:disable disallowMixedSpacesAndTabs, requireDotNotation, requirePaddingNewLinesBeforeLineComments, requireTrailingComma
*/
(function () {

    'use strict';

    var mod =
        angular
            .module('openmrs.angularFormentry');

    mod.run(function (formlyConfig) {
        formlyConfig.setType({
            name: 'ui-select-extended',
            wrapper: ['bootstrapLabel', 'bootstrapHasError', 'validation'],
            template: '<div class="input-group">' +
            '<ui-select ng-model="model[options.key]" theme="bootstrap" ' +
            'ng-required="{{to.required}}" ng-disabled="{{to.disabled}}" ' +
            'reset-search-input="false"> ' +
            '<ui-select-match placeholder="{{to.placeholder}}"> ' +
            '{{evaluateFunction($select.selected[to.labelProp || \'name\'])}}{{setSelectedObject($select.selected)}}' +
            '</ui-select-match> ' +
            '<ui-select-choices refresh="refreshItemSource($select.search)" ' +
            'group-by="to.groupBy" refresh-delay="1000"' +
            'repeat="(evaluateFunction(option[to.valueProp || \'value\'])) ' +
            'as option in itemSource" > ' +
            '<div ng-bind-html="evaluateFunction(option[to.labelProp || \'name\']) | ' +
            'highlight: $select.search"></div> </ui-select-choices> </ui-select>' +
            '<div class="input-group-addon" >' +
            '<span class="text-primary" ng-show="isBusy">Loading..</span>' +
            '</div>' +
            '</div>',
            link: function (scope, el, attrs, vm) {
                //incase we need link function
            },

            controller: function ($scope, $log) {
                var vm = this;
                $scope.to.required = $scope.options.expressionProperties['templateOptions.required'];
                $scope.to.disabled = $scope.options.expressionProperties['templateOptions.disabled'];
                $scope.itemSource = [];
                $scope.refreshItemSource = refreshItemSource;
                $scope.evaluateFunction = evaluateFunction;
                $scope.setSelectedObject = setSelectedObject;
                vm.getSelectedObject = getSelectedObject;

                $scope.$watch(function (scope) {
                    return evaluateFunction(scope.model[scope.options.key]);
                },

                    function (val) {
                        if ($scope.itemSource !== undefined && $scope.itemSource.length === 0) {
                            getSelectedObject();
                        }

                    });

                activate();
                function activate() {
                    validateTemplateOptions();
                    getSelectedObject();
                }

                function getSelectedObject() {
                    var selectedValue = $scope.model[getKey($scope.options.key)] ?
                        (typeof $scope.model[getKey($scope.options.key)].value === 'function' ?
                            $scope.model[getKey($scope.options.key)].value() : $scope.model[getKey($scope.options.key)].value) : undefined;
                    if (selectedValue !== undefined && selectedValue !== null && selectedValue !== '') {
                        $scope.isBusy = true;
                        $scope.to.getSelectedObjectFunction(selectedValue, function (object) {
                            $scope.isBusy = false;
                            $scope.itemSource = [object];
                        },

                            function (error) {
                                $scope.isBusy = false;
                                $log.error(error);
                            });
                    }
                }

                function refreshItemSource(value) {
                    if (isBlank(value) === false) {
                        $scope.isBusy = true;
                        $scope.to.deferredFilterFunction(value, function (results) {
                            $scope.isBusy = false;
                            $scope.itemSource = results;
                        },

                            function (error) {
                                $scope.isBusy = false;
                                $log.error(error);
                            });
                    }
                }

                function setSelectedObject(selectedObject) {
                    console.log('setting selected object', selectedObject);
                    $scope.model[getKey($scope.options.key)].valueObject = selectedObject;
                }

                function evaluateFunction(obj) {
                    //console.log('$select.selected', obj);
                    if (obj && (typeof obj) === 'function') {
                        return obj();
                    }

                    return obj;
                }

                function isBlank(str) {
                    if (str === null || str.length === 0 || str === ' ') return true;
                    return false;

                }

                function getKey(key) {
                    if (key === null || key === undefined) {
                        return key;
                    }

                    return key.split('.')[0];
                }

                function validateTemplateOptions() {
                    if (!$scope.to.deferredFilterFunction) {
                        $log.error('Template Options must define deferredFilterFunction');
                        $log.error($scope.to);
                    }

                    if ($scope.to.deferredFilterFunction && (typeof $scope.to.deferredFilterFunction) !== 'function') {
                        $log.error('Template Options deferredFilterFunction is a function');
                        $log.error($scope.to);
                    }

                    if (!$scope.to.getSelectedObjectFunction) {
                        $log.error('Template Options must define getSelectedObjectFunction');
                        $log.error($scope.to);
                    }

                    if ($scope.to.getSelectedObjectFunction && (typeof $scope.to.getSelectedObjectFunction) !== 'function') {
                        $log.error('Template Options getSelectedObjectFunction is a function');
                        $log.error($scope.to);
                    }
                }
            }
        });
    });

})();

/*
jshint -W106, -W098, -W109, -W003, -W068, -W004, -W033, -W030, -W117, -W116, -W069, -W026
*/
/*
jscs:disable disallowMixedSpacesAndTabs, requireDotNotation, requirePaddingNewLinesBeforeLineComments, requireTrailingComma
*/
(function() {

  'use strict';

  var mod =
        angular
            .module('openmrs.angularFormentry');

  mod.run(function(formlyConfig) {
    // Configure custom types
    formlyConfig.setType({
      name: 'ui-select-single',
      // extends:"select",
      wrapper: ['bootstrapLabel', 'bootstrapHasError', 'validation'],
      template: '<div><ui-select ng-model="model[options.key]" theme="bootstrap" ' +
      'ng-required="to.required" ng-disabled="to.disabled" ' +
      'reset-search-input="false"> ' +
      '<ui-select-match placeholder="{{to.placeholder}}" data-allow-clear="true"> ' +
      '{{$select.selected[to.labelProp || \'name\']}} </ui-select-match> ' +
      '<ui-select-choices group-by="to.groupBy" ' +
      'repeat="option[to.valueProp || \'value\'] ' +
      'as option in to.options | filter: $select.search"> ' +
      '<div ng-bind-html="option[to.labelProp || \'name\'] | highlight: $select.search"> ' +
      '</div> </ui-select-choices> </ui-select></div>',
        controller: function($scope, $log, $timeout) {
          // $scope.to.required = $scope.options.expressionProperties['templateOptions.required']
          // $scope.to.disabled = $scope.options.expressionProperties['templateOptions.disabled']
          // $scope.isRequired = function() {
          //   return $scope.to.required || $scope.options.expressionProperties['templateOptions.required']
          // };
          //
          // // $scope.isDisabled = false;
          // // $timeout(function () {
          // //   $scope.isDisabled = true;
          // // }, 10000);
          // $scope.isDisabled = function() {
          //   return $scope.to.disabled || $scope.options.expressionProperties['templateOptions.disabled']
          // };
        }
    });

    formlyConfig.setType({
      name: 'ui-select-multiple',
      // extends:"select",
      wrapper: ['bootstrapLabel', 'bootstrapHasError', 'validation'],
      template: '<ui-select multiple ng-model="model[options.key]" theme="bootstrap" ' +
     'ui-select-required="{{to.required}}" ng-disabled="{{to.disabled}}" ' +
     'reset-search-input="false"> ' +
     '<ui-select-match placeholder="{{to.placeholder}}"> ' +
     '{{$item[to.labelProp || \'name\']}} </ui-select-match> ' +
     '<ui-select-choices group-by="to.groupBy" ' +
     'repeat="option[to.valueProp || \'value\'] ' +
     'as option in to.options | filter: $select.search"> ' +
     '<div ng-bind-html="option[to.labelProp || \'name\'] | highlight: $select.search"> ' +
     '</div> </ui-select-choices> </ui-select>'
    });
  });

})();

/*
jshint -W106, -W098, -W003, -W068, -W004, -W033, -W030, -W117, -W116, -W069, -W026
*/
/*
jscs:disable disallowMixedSpacesAndTabs, requireDotNotation, requirePaddingNewLinesBeforeLineComments, requireTrailingComma
*/
(function() {
    'use strict';

    var mod =
        angular
            .module('openmrs.angularFormentry');

    mod.run(function config(formlyConfig) {
        formlyConfig.setType({
            name: 'repeatSection',
            template: '<div class="panel panel-default"> ' +
            '<div class="panel-heading"> ' +
            '{{to.label}}' +
            '</div> ' +
            '<div class="panel-body"> ' +
            // <!--loop through each element in model array-->
            '<div class="{{hideRepeat}}"> ' +
            '<div class="repeatsection" ng-repeat="element in model[options.key]" ' +
            'ng-init="fields = copyFields(to.fields)"> ' +
            '<formly-form fields="fields" ' +
            'model="element" bind-name="\'formly_ng_repeat\' + index + $parent.$index"> ' +
            '</formly-form> ' +
            '<p> ' +
            '<button type="button" class="btn btn-sm btn-danger" ng-click="model[options.key].splice($index, 1)"> ' +
            'Remove ' +
            '</button> ' +
            '</p> ' +
            '<hr> ' +
            '</div> ' +
            '<p class="AddNewButton"> ' +
            '<button type="button" class="btn btn-primary" ng-click="addNew()" >{{to.btnText}}</button> ' +
            '</p> ' +
            '</div> ' +
            '</div>',
            controller: function($scope, $log, CurrentLoadedFormService) {
                $scope.formOptions = { formState: $scope.formState };
                $scope.addNew = addNew;

                $scope.copyFields = copyFields;

                function copyFields(fields) {
                    var copy = angular.copy(fields);
                    addFieldsToQuestionMap(copy);
                    return copy;
                }

                function addFieldsToQuestionMap(groups) {
                    _.each(groups, function(group) {
                        _.each(group.fieldGroup, function(field) {
                            var id = field.data.id;
                            if (!_.isEmpty(id)) {
                                if (id in CurrentLoadedFormService.questionMap) {
                                    CurrentLoadedFormService.questionMap[id].push(field);
                                } else {
                                    CurrentLoadedFormService.questionMap[id] = [field];
                                }
                            }
                        });
                    });
                }

                function addNew() {
                    $scope.model[$scope.options.key] = $scope.model[$scope.options.key] || [];
                    $log.log('Repeat section');
                    // $log.log($scope);
                    // $log.log($scope.to.createModelBluePrint(null,[{}]));
                    var repeatsection = $scope.model[$scope.options.key];
                    // $log.log('Repeat section Val');
                    // $log.log(repeatsection);
                    var lastSection = repeatsection[repeatsection.length - 1];
                    // $log.log('Model blueprint');
                    // $log.log($scope.to.createModelBluePrint(null,[{}]));
                    var currentModel = $scope.to.createModelBluePrint(null, [{}])
                    var revisedModel = angular.copy(currentModel);
                    var newsection = revisedModel[0];
                    delete newsection['schemaQuestion']
                    // if (lastSection) {
                    //   newsection = angular.copy(lastSection);
                    // }
                    //   newsection.obs1_a894b1ccn1350n11dfna1f1n0026b9348838 = {
                    //       value: 'a893516a-1350-11df-a1f1-0026b9348838'
                    //   };
                    // $log.log('New Section blueprint');
                    // $log.log($scope.originalModel);
                    repeatsection.push(newsection);
                }
            }
        });
    });
})();

/*
jshint -W106, -W098, -W003, -W068, -W004, -W033, -W030, -W117, -W116, -W069, -W026
*/
/*
jscs:disable disallowMixedSpacesAndTabs, requireDotNotation, requirePaddingNewLinesBeforeLineComments, requireTrailingComma
*/
(function() {
  'use strict';

  var mod =
          angular
              .module('openmrs.angularFormentry');

  mod.run(function config(formlyConfig) {

    /*
    Testing nested sections in formly way
    */
    // set templates here
    formlyConfig.setType({
      name: 'section',
      template: '<formly-form model="model[options.key]" ' +
                'fields="options.data.fields"></formly-form>'
    });

	   formlyConfig.setWrapper({
      name: 'panel',
      types: ['section'],
      template: '<div class="panel panel-primary"> ' +
        '<div class="panel-heading px-nested-panel-heading clearfix" ng-click="expanded = !expanded; loaded =true;" > ' +
          '<strong class="control-label" ng-if="to.label"> '  +
            '{{to.label}} ' +
            "{{to.required ? '*' : ''}}  "+
          '</strong>'  +
          '<button type="button" class="btn btn-sm btn-primary pull-right" ng-init="expanded = loaded = (to.expanded || false)" >' +
          '<span ng-show="!expanded">Show  <span class="glyphicon glyphicon-menu-down"></span></span>' +
          '<span ng-show="expanded">Hide <span class="glyphicon glyphicon-menu-up"></span></span>' +
          '</button>'+
        '</div> ' +
        '<div class="panel-body px-nested-panel-body" ng-show="expanded" ng-if="loaded || expanded"> ' +
          '<formly-transclude></formly-transclude> ' +
        '</div> ' +
      '</div>'
    });
  });
})();

/*
jshint -W106, -W098, -W003, -W068, -W004, -W033, -W030, -W117, -W116, -W069, -W026
*/
/*
jscs:disable disallowMixedSpacesAndTabs, requireDotNotation, requirePaddingNewLinesBeforeLineComments, requireTrailingComma
*/
(function() {

  'use strict';
  var mod =
    angular
      .module('openmrs.angularFormentry');

  mod.run(function(formlyConfig) {
    formlyConfig.setType({
      name: 'concept-search-select',
      wrapper: ['bootstrapLabel', 'bootstrapHasError', 'validation'],
      extends: 'select',
      defaultOptions: {
        templateOptions: {

        }
      },
      controller:function($scope, $filter, $log) {
        activate();
        function activate() {
          validateTemplateOptions();
          fetchOptions();
        }

        function fetchOptions() {
          $scope.to.fetchOptionsFunction($scope.to.questionConceptUuid,
            fetchOptionsSuccess, fetchOptionsFail);
        }

        function fetchOptionsSuccess(options) {
          $scope.to.options = [];
          angular.forEach(options, function(value, key) {
            var valueMember = $scope.to.valueMember;
            var displayMember = $scope.to.displayMember;
            var val = evaluateFunction(value[valueMember]);
            var display = evaluateFunction(value[displayMember]);
            var displayFormated = $filter('titlecase')(display);
            var option = {name:displayFormated,value:val};
            $scope.to.options.push(option);
          });
        }

        function fetchOptionsFail(error) {
          $log.log(error);
        }

        function validateTemplateOptions() {
          if (!$scope.to.fetchOptionsFunction) {
            $log.error('Template Options must define fetchOptionsFunction function');
            $log.error($scope.to);
          }

          if ($scope.to.fetchOptionsFunction && (typeof $scope.to.fetchOptionsFunction) !== 'function') {
            $log.error('Template Options fetchOptionsFunction is Not a function');
            $log.error($scope.to);
          }

          if (!$scope.to.questionConceptUuid) {
            $log.error('Template Options must define questionConceptUuid');
            $log.error($scope.to);
          }

        }

        function evaluateFunction(obj) {
          if (obj && (typeof obj) === 'function') {
            return obj();
          }

          return obj;
        }

        function isBlank(str) {

          if (str === null || str.length  === 0 || str === ' ') return true;
          return false;

        }
      }
    });
  });

})();

/*
jshint -W106, -W098, -W109, -W003, -W068, -W004, -W033, -W030, -W117, -W116, -W069, -W026
*/
/*
jscs:disable disallowMixedSpacesAndTabs, requireDotNotation, requirePaddingNewLinesBeforeLineComments, requireTrailingComma
*/
(function () {

    'use strict';

    var mod =
        angular
            .module('openmrs.angularFormentry');

    mod.run(function (formlyConfig) {
        // Configure custom types
        formlyConfig.setType({
            name: 'historical-text',
            wrapper: [],
            template: '<div style="margin-top:-14px;" ng-if="historicalValue">' +
            '<div class="panel panel-default" ng-if="!to.prepopulate">' +
            '<div class="container-fluid">' +
            '<div style="padding: 1px;" class="row">' +
            '<div style="padding-left: 4px; padding-top: 4px;" class="col-xs-9" >' +
            '<span style="font-wieght:bold;" class="text-warning">Previous Value: </span>' +
            '<span style="font-weight: bold;" >{{historicalDisplay}}<span/></div>' +
            '<button type="button" class="btn btn-default btn-small col-xs-3" ng-click="setValue()">Use Value</button>' +
            '</div>' +
            '</div>' + 
            '</div></div>',
            link: function (scope, el, attrs, vm) {
                //incase we need link function
            },

            controller: function ($scope, $log, HistoricalDataService) {
                //functions
                $scope.setValue = setValue;
                $scope.getDisplayValue = getDisplayValue;

                //variables 
                $scope.historicalDisplay = '';
                $scope.historicalValue = null;

                //bring historical data alias into scope
                var HD = HistoricalDataService;

                //used in one of the schema historical expressions
                var sampleRepeatingGroupValue =
                    [{
                        'a8a07a48x1350x11dfxa1f1-0026b9348838': 'reason for hospital',
                        'made-up-concept-4': [{
                            'made-up-concept-5': '2016-01-20',
                            'made-up-concept-6': '2016-01-21'
                        }]
                    },
                        {
                            'a8a07a48x1350x11dfxa1f1-0026b9348838': 'reason for hospital 2',
                            'made-up-concept-4': [{
                                'made-up-concept-5': '2016-01-22',
                                'made-up-concept-6': '2016-01-23'
                            }]
                        }];

                init();

                function init() {
                    $scope.getDisplayValue();
                }

                function setValue() {
                    var field = $scope.to.parentField;
                    field.templateOptions.setFieldValue(field, $scope.historicalValue);
                }

                function getDisplayValue() {
                    var field = $scope.to.parentField;

                    var historicalExpression = field.templateOptions.historicalExpression;

                    //evaluate expression and set historicalValue with the result
                    if (historicalExpression) {
                        try {
                            $scope.historicalValue = eval(historicalExpression);
                        } catch (error) {
                            $log.debug('Could not evaluate historical expression "' + historicalExpression + '". Error: ', error);
                        }
                    }

                    //get display version of the value by calling the getdisplay function
                    //of the field
                    if ($scope.to.prepopulate !== true)
                        if (field.templateOptions.getDisplayValue && $scope.historicalValue !== undefined) {
                            field.templateOptions.getDisplayValue($scope.historicalValue,
                                function (displayValue) {
                                    $scope.historicalDisplay = displayValue;
                                });
                        }

                    if ($scope.to.prepopulate)
                        setValue();

                }

                function arrayContains(array, members) {
                    if (Array.isArray(members)) {
                        if (members.length === 0) {
                            return true;
                        }
                        var contains = true;
                        _.each(members, function (val) {
                            if (array.indexOf(val) === -1) {
                                contains = false;
                            }
                        });
                        return contains;
                    }
                    else {
                        return array.indexOf(members) !== -1;
                    }
                }

                function arrayContainsAny(array, members) {
                    if (Array.isArray(members)) {
                        if (members.length === 0) {
                            return true;
                        }
                        var contains = false;
                        _.each(members, function (val) {
                            if (array.indexOf(val) !== -1) {
                                contains = true;
                            }
                        });
                        return contains;
                    }
                    else {
                        return array.indexOf(members) !== -1;
                    }
                }
            }


        });

    });

})();
/* global angular */
/*
jshint -W106, -W098, -W109, -W003, -W068, -W004, -W033, -W030, -W117, -W116, -W069, -W026
*/
(function () {

    'use strict';

    var mod =
        angular
            .module('openmrs.angularFormentry');

    mod.run(function (formlyConfig) {
        formlyConfig.setType({
            name: 'anchor',
            template: '<div id="{{to.ownerKey}}"><div>'
        });

    });

})();
/*
jshint -W106, -W098, -W109, -W003, -W068, -W004, -W033, -W030, -W117, -W116, -W069, -W026
*/
/*
jscs:disable disallowMixedSpacesAndTabs, requireDotNotation, requirePaddingNewLinesBeforeLineComments, requireTrailingComma
*/
(function() {

  'use strict';

  var mod =
    angular
    .module('openmrs.angularFormentry');

  mod.run(function(formlyConfig) {
      
        formlyConfig.setType({
            name: 'kendo-date-picker',
            // extends:"select",
            wrapper: ['bootstrapLabel', 'bootstrapHasError', 'validation'],
            template:
            '<div style="width: 100%;" class="input-group">' +
            '<input style="width: 100%;" kendo-date-picker="myPicker" k-options="datePickerConfig" ' +
            'ng-model="$scope.selectModel" ng-click="open()"/> ' +
            '<div ng-if="to.weeksList && to.weeksList.length > 0" class="dropup input-group-btn">' +
            '<button type="button" ng-disabled="to.disabled" class="btn btn-sm btn-default dropdown-toggle" data-toggle="dropdown" >'+
            '<span class="weeks-control"> Weeks </span> <span class="caret"></span></button>'+
            '<ul class="dropdown-menu dropdown-menu-right">' +
             '<li ng-repeat="week in to.weeksList"><a ng-click="setByWeeks(week)">{{week}} Weeks</a></li>'+
            '</ul>'+
            '</div>' +
            '</div>',

            controller: function($scope, $log, $timeout, moment) {
                var x = $scope.model[$scope.options.key.split('.')[0]];

                if (!_.isUndefined(x.value)) {
                    //format the date
                    x.value = kendo.toString(x.value, "yyyy-MM-dd HH:mm:ss+0300");
                }
                $scope.datePickerConfig = {
                    format: "dd-MM-yyyy",
                    parseFormats: ["yyyy-MM-ddTHH:mm:ss+0300", "yyyy-MM-dd HH:mm:ss+0300", "yyyy-MM-ddTHH:mm:ss.000Z", "yyyy-MM-ddTHH:mm:ss", "dd-MM-yyyy", "yyyy-MM-dd", "dd/MM/yyyy", "yyyy/MM/dd"],
                    change: function() {
                        var datePickerVal = this.value();
                        x.value = $scope.options.value(kendo.toString(datePickerVal, "yyyy-MM-dd HH:mm:ss+0300"));
                        console.log('test kendo', datePickerVal)
                        $scope.$digest();
                    }
                };

                $scope.open = function() {
                    $scope.myPicker.open();
                };
                
                $scope.setByWeeks = function(week) {
                    var oneMonth = new moment().add(week, 'weeks');
                     x.value = kendo.toString(oneMonth.toDate(), "yyyy-MM-dd HH:mm:ss+0300");
                };
            }
        });
         
    // Configure custom types
    formlyConfig.setType({
      name: 'kendo-select-multiple',
      // extends:"select",
      wrapper: ['bootstrapLabel', 'bootstrapHasError', 'validation'],
      template: '<div> ' +
        '<select multiple="multiple"  kendo-multi-select k-options="selectOptions" ' +
        'ng-model="$scope.model[$scope.options.key]" ></select> ' +
        '</div> ',

      controller: function($scope, $log, $timeout) {
        var x = $scope.model[$scope.options.key.split('.')[0]]
          //can be used when using getterSetter provided by model options
        $scope.selectModel = function(val) {
          if (angular.isDefined(val)) {
            x.value = val;
          } else {
            return x.value;
          }
        }; //$scope.model[$scope.options.key];


        $scope.selectOptions = {
          dataTextField: 'name',
          dataValueField: 'value',
          valuePrimitive: true,
          dataSource: $scope.to.options
        };
      },
      link: function(scope, el, attrs) {
        $('.k-input').attr('readonly', "readonly")
      }
    });

    formlyConfig.setType({
      name: 'kendo-select',
      // extends:"select",
      wrapper: ['bootstrapLabel', 'bootstrapHasError', 'validation'],
      template: '<div class="input-group"> ' +
        '<select kendo-drop-down-list k-options="selectOptions"' +
        'ng-model="$scope.model[$scope.options.key]" style="width: 100%;"></select>' +
        '<div class="input-group-addon" ng-click="clearValue()">' +
        '<span class="glyphicon glyphicon-remove"></span>' +
        '</div>' +
        '</div> ',

      controller: function($scope, $log, $timeout) {
        var x = $scope.model[$scope.options.key.split('.')[0]]
          //can be used when using getterSetter provided by model options
        $scope.selectModel = function(val) {
          if (angular.isDefined(val)) {
            x.value = val;
          } else {
            return x.value;
          }
        }; //$scope.model[$scope.options.key];

        $scope.clearValue = function() {
          x.value = null;
        };
        if( $scope.to.options[0].name != '')
            $scope.to.options.unshift({name:'',value:''});
            
        $scope.selectOptions = {
          dataTextField: 'name',
          dataValueField: 'value',
          valuePrimitive: true,
          dataSource: $scope.to.options
        };
      }
    });

  })

})();

/*
jshint -W106, -W098, -W003, -W068, -W004, -W033, -W030, -W117, -W116, -W069, -W026
*/
/*
jscs:disable disallowMixedSpacesAndTabs, requireDotNotation, requirePaddingNewLinesBeforeLineComments, requireTrailingComma
*/
(function () {
    'use strict';

    var mod =
        angular
            .module('openmrs.angularFormentry');

    mod.run(function config(formlyConfig) {
        formlyConfig.setType({
            name: 'orderSection',
            template: '<div class="panel panel-default"> ' +
            '<div class="panel-heading"> ' +
            '{{to.label}}' +
            '</div> ' +
            '<div class="panel-body"> ' +
            // <!--loop through each element in model array-->
            '<div class="{{hideRepeat}}"> ' +
            '<div class="repeatsection" ng-repeat="element in model[options.key].orders" ' +
            'ng-init="fields = copyFields(to.fields)"> ' +
            '<span>{{$parent.getDisplayValue(element.concept)}}</span></br>' +
            '<span ng-if="element.orderNumber" class="text-success">{{"#: " + element.orderNumber}}</span>' +
            // '<formly-form fields="fields" ' +
            // 'model="element" bind-name="\'formly_ng_repeat\' + index + $parent.$index"> ' +
            // '</formly-form> ' +
            '<p ng-hide="element.orderNumber"> ' +
            '<button type="button" class="btn btn-sm btn-danger" ng-hide="element.orderNumber" ng-click="deleteField($index)"> ' +
            'Remove' +
            '</button> ' +
            '</p> ' +
            '<hr> ' +
            '</div> ' +
            '<p class="AddNewButton" ng-hide="addingNew"> ' +
            '<button type="button" class="btn btn-primary" ng-click="addingNew = true" >+ Order Test</button> ' +
            '</p> ' +
            '<div ng-show="addingNew">' +
            '<select kendo-drop-down-list k-options="selectOptions"' +
            'ng-model="$scope.selectedOrder" style="width: 100%;"></select>' +
            '<button style="margin-top:4px;" type="button" class="btn btn-success" ng-click="addNew($scope.selectedOrder)" >Ok</button> ' +
            '<button style="margin-top:4px;" type="button" class="btn btn-default" ng-click="addingNew = false" >Cancel</button> ' +
            '</div>' +
            '</div> ' +
            '</div>',
            controller: function ($scope, $log, CurrentLoadedFormService) {
                //$scope.formOptions = { formState: $scope.formState };

                $scope.addingNew = false;

                $scope.addNew = addNew;
                $scope.deleteField = deleteField;

                $scope.selectedOrder = undefined;

                $scope.selectOptions = {
                    dataTextField: 'label',
                    dataValueField: 'concept',
                    valuePrimitive: true,
                    dataSource: $scope.options.data.selectableOrders
                };

                $scope.copyFields = copyFields;
                $scope.getDisplayValue = getDisplayValue;

                function getDisplayValue(orderConcept) {
                    var orders = $scope.options.data.selectableOrders;
                    for (var i = 0; i < orders.length; i++) {
                        if (orders[i].concept === orderConcept)
                            return orders[i].label;
                    }
                }

                function copyFields(fields) {
                    var copy = angular.copy(fields);
                    addFieldsToQuestionMap(copy);
                    return copy;
                }

                function addFieldsToQuestionMap(groups) {

                    _.each(groups, function (group) {
                        _.each(group.fieldGroup, function (field) {
                            var id = field.data.id;
                            if (!_.isEmpty(id)) {
                                if (id in CurrentLoadedFormService.questionMap) {
                                    CurrentLoadedFormService.questionMap[id].push(field);
                                } else {
                                    CurrentLoadedFormService.questionMap[id] = [field];
                                }
                            }
                        });
                    });
                }

                function addNew(orderConcept) {
                    //$scope.model[$scope.options.key] = $scope.model[$scope.options.key] || [];
                    $log.log('order section');
                    var orderSectionModel = $scope.model[$scope.options.key].orders;
                    orderSectionModel.push($scope.to.createChildFieldModel(orderConcept));
                    $scope.addingNew = false;
                }

                function deleteField($index) {
                    var deletedOrder = $scope.model[$scope.options.key].orders[$index];
                    if (!$scope.model[$scope.options.key].orders.deletedOrders)
                        $scope.model[$scope.options.key].orders.deletedOrders = [];
                    $scope.model[$scope.options.key].orders.deletedOrders.push(deletedOrder);
                    $scope.model[$scope.options.key].orders.splice($index, 1);
                }
            }
        });
    });
})();

/*
jshint -W098, -W003, -W068, -W004, -W033, -W030, -W117, -W069
*/
/*jscs:disable safeContextKeyword, requireDotNotation, requirePaddingNewLinesBeforeLineComments, requireTrailingComma*/
(function () {
    'use strict';

    angular
        .module('openmrs.angularFormentry')
        .directive('formlyErrorSummary', formlyErrorSummary);

    function formlyErrorSummary() {
        var directive = {
            template:
            '<style type="text/css">' +
            '    body {' +
            '        margin: 20px' +
            '    }' +
            '    .formly-field {' +
            '        margin-bottom: 16px;' +
            '    }' +
            '    .formly-error-summary {' +
            '        margin-bottom: 20px;' +
            '    }' +
            '    .color-error {' +
            '        color: red;' +
            '    }' +
            '    .color-success {' +
            '        color: green' +
            '    }' +
            '</style>' +
            '<!-- The field here are the fields passed within the directives scope -->' +
            '<div class="formly-error-summary">' +
            '    <!--' +
            '    Allow all validations to be run on form submit only and when its rendered' +
            '    Other custom validations will still run  when the field is touched anyway' +
            '     -->' +
            '    <div style="margin-left:4px; margin-bottom: 4px;" data-ng-repeat="field in vm.pageFields" class="color-error">' +
            '        <div ng-click="vm.navigateToQuestion(vm.tabTitle, field.key, field)" data-ng-show="field.formControl.$invalid">' +
            '            <span class="text-primary"><i class="glyphicon glyphicon-zoom-in"></i> {{field.templateOptions.label}} </span>' +
            '            <br/>' +
            '            <i style="margin-left:10px;" class="glyphicon glyphicon-{{field.formControl.$invalid ? "remove" : "ok"}}"></i>'+
            '            <span data-ng-if="field.formControl.$invalid">' +
            '              {{vm.getErrorAsList(field)}} ' +
            '          </span>' +
            '        </div>' +
            '    </div>' +
            '</div>',
            scope: {},
            bindToController: {
                form: '=',
                fields: '=',
                pageFields: '=',
                tabTitle: '='
            },
            controllerAs: 'vm',
            controller: Controller

        };
        return directive;
    }
    Controller.$inject = ['$scope', '$rootScope'];
    function Controller($scope, $rootScope) {
        var vm = this;
        // console.log('directive Scope', vm);
        vm.pageFields = [];
        // console.log('fields in error directive ', vm.fields)
        updateFields();
        // console.log('Total fields loaded: ', vm.page_fields.length)
        vm.getErrorAsList = getErrorAsList;

        vm.navigateToQuestion = navigateToQuestion;

        function updateFields() {
            //create field list acceptable to the error summary directive
            if (vm.pageFields.length === 0) {
                // console.log('+++++Loading Error summary Controller');
                _.each(vm.fields, function (_section) {
                    if (_section.type === 'section') {
                        _.each(_section.data.fields, function (_field) {
                            if (_field.type !== 'section' && _field.type !== 'group' &&
                                _field.type !== 'repeatSection' && _field.type !== undefined) {
                                vm.pageFields.push(_field);
                                // console.log('added field',_field);
                                // console.log('added field label ', _field.templateOptions.label)
                            } else if (_field.type === 'repeatSection') {
                                _.each(_field.templateOptions.fields[0].fieldGroup,
                                    function (_field_) {
                                        vm.pageFields.push(_field_);
                                        // console.log('added field',_field_);
                                        // console.log('added field label ', _field_.templateOptions.label)
                                    });
                            } else {
                                _.each(_field.fieldGroup, function (__field_) {
                                    vm.pageFields.push(__field_);
                                    // console.log('added field',__field_);
                                    // console.log('added field label ', __field_.templateOptions.label)
                                });
                            }
                        });
                    }
                });
            }
            $scope.pageFields = vm.pageFields;
        }

        function getErrorAsList(field) {
            /*
            this method will always be called when any field is touched
            It idealy triggers all the validations on the form
            It may be have have some Negative performance of the form especially on the tablet
            */
            if (field.formControl !== undefined) {
                return Object.keys(field.formControl.$error).map(function (error) {
                    // note, this only works because the all the field types have been explicityly defined.
                    //console.log('Erroorr', field);
                    //console.log('selected field label ', field.templateOptions.label);
                    var msg;
                    if (error === 'max') {
                        msg = 'The maximum value allowed is ' + field.templateOptions.max;
                    } else if (error === 'min') {
                        msg = 'The minimum value allowed is ' + field.templateOptions.min;
                    } else {
                        msg = typeof field.validation.messages[error] === 'function'? 
                        field.validation.messages[error](): 'Unknown error';
                    }

                    return msg;
                }).join(', ');
            }
        }

        function navigateToQuestion(tabTitle, questionKey, field) {
            if (field && field.formControl &&
                field.formControl.$setTouched &&
                typeof field.formControl.$setTouched === 'function') {
                field.formControl.$setTouched();
            }

            $rootScope.$broadcast("navigateToQuestion", { tabTitle: tabTitle, questionKey: questionKey });
        }
    }
})();

/*
jshint -W098, -W003, -W068, -W004, -W033, -W030, -W117, -W069, -W106
*/
/*jscs:disable disallowMixedSpacesAndTabs, requireDotNotation, requirePaddingNewLinesBeforeLineComments, requireTrailingComma*/
(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name angularFormentryApp.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the angularFormentryApp
   */
  angular.module('angularFormentry')
    .controller('MainCtrl', MainCtrl);
  MainCtrl.$inject = ['$scope', 'FormentryUtilService', 'FormEntry', '$log'];
  function MainCtrl($scope, FormentryUtilService, FormEntry, $log) {
      $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
      FormEntry.createForm({}, {}, function(schema) {
        $log.info('loaded as expected');
      });

      function otherHandler() {
        $log.log('cheers');
      }
    }
})();

/*
 jshint -W098, -W003, -W068, -W004, -W033, -W030, -W117, -W069, -W106
 */
/*jscs:disable disallowMixedSpacesAndTabs, requireDotNotation, requirePaddingNewLinesBeforeLineComments, requireTrailingComma*/
(function () {
    'use strict';
    /**
     * @ngdoc function
     * @name angularFormentryApp.controller:AboutCtrl
     * @description
     * # AboutCtrl
     * Controller of the angularFormentryApp
     */
    angular
        .module('angularFormentry')
        .controller('AboutCtrl', AboutCtrl);

  AboutCtrl.$inject = ['$log', '$location', '$scope','FormEntry', '$timeout',
    '$filter','TestService', 'FormentryUtilService', '$rootScope', 'configService',
     'SearchDataService', 'EncounterDataService'
  ];

    function AboutCtrl($log, $location, $scope, FormEntry,
        $timeout, $filter, TestService, FormentryUtilService, $rootScope, configService,
        SearchDataService, EncounterDataService) {
        $scope.vm = {};
        $scope.vm.model = {};
        $scope.vm.questionMap = {};
        $scope.vm.hasClickedSubmit = false;
        var schema;
        var newForm;
        
        var testSchema = 'schema_encounter';
        //var testSchema = 'adult';

        //connect to database
        configService.addJsonSchema('hostServer', 'http://localhost:8080/amrs/ws/rest/v1/');

        //broad cast server connection
        $rootScope.$broadcast('hostServer', configService.getSchema('hostServer'));
        var user = { username: 'akwatuha', password: 'ttt' };
        // AuthService.isAuthenticated(user, function (authenticated) {
        //     if (!authenticated) // check if user is authenticated
        //     {
        //         console.log('Invalid user name or password. Please try again');
        //     } else {
        //         console.log(authenticated);
        //     }
        //
        // });

        //testing search connections
        SearchDataService.findLocation('abu', function (success) {
            console.log(JSON.stringify(success));
        },
            function (error) {
                console.log(JSON.stringify(error));
            });
            
        var createForm = function() {
            //set up historical data for triage form
            setUpHistoricalData();

            $log.info('Schema Controller', schema);
            var formObject = FormEntry.createForm(schema, $scope.vm.model);
            newForm = formObject.formlyForm;
            $log.debug('schema xxx', newForm);
            $scope.vm.tabs = newForm;
            $scope.vm.questionMap = formObject.questionMap;
            console.log('final question map', $scope.vm.questionMap);
            FormEntry.updateFormWithExistingObs($scope.vm.model,restObs);
        };


        FormentryUtilService.getFormSchema(testSchema, function (data) {
            schema = data;
            
            if(_.isEmpty(schema.referencedForms)) {
                createForm();
            } else {
                var referencedFormNames = [];
                _.each(schema.referencedForms, function(reference) {
                    referencedFormNames.push(reference.formName);
                });
                
                FormentryUtilService.getFormSchemaReferences(referencedFormNames, function(formSchemas) {
                    FormEntry.compileFormSchema(schema, formSchemas);
                    createForm();
                }, function(error) {
                    console.error('Could not load referenced forms', error);
                });
            }
            
        });


        var restObs = {
            uuid: "test-uuid",
            encounterDatetime: "2015-11-30T14:44:38.000+0300",
            form: {
                uuid: "a2b811ed-6942-405a-b7f8-e7ad6143966c",
                name: "Triage Encounter Form v0.01"
            },
            location: {
                uuid: "08fec056-1352-11df-a1f1-0026b9348838",
                display: "Location-13"
            },
            encounterType: {
                uuid: "a44ad5e2-b3ec-42e7-8cfa-8ba3dbcf5ed7",
                display: "TRIAGE"
            },
            provider: {
                uuid: "5b6e31da-1359-11df-a1f1-0026b9348838",
                display: "Giniton Giniton Giniton"
            },
            obs: [
                {
                    uuid: "655fb051-499f-4240-9a1d-0dff5f8b5730",
                    obsDatetime: "2015-11-30T14:44:38.000+0300",
                    concept: {
                        uuid: "9ce5dbf0-a141-4ad8-8c9d-cd2bf84fe72b"
                    },
                    value: {
                        uuid: "a89ad3a4-1350-11df-a1f1-0026b9348838",
                        display: "NOT APPLICABLE"
                    },
                    groupMembers: null
                },
                {
                    uuid: "655fb051-499f-4240-9a1d-0dff5f8b5730",
                    obsDatetime: "2015-11-30T14:44:38.000+0300",
                    concept: {
                        uuid: "a894b1cc-1350-11df-a1f1-0026b9348838"
                    },
                    value: {
                        uuid: "a893516a-1350-11df-a1f1-0026b9348838",
                        display: "CONDOMS"
                    },
                    groupMembers: null
                },
                {
                    uuid: "655fb051-499f-4240-9a1d-0dff5f8b5731",
                    obsDatetime: "2015-11-30T14:44:38.000+0300",
                    concept: {
                        uuid: "a894b1cc-1350-11df-a1f1-0026b9348838"
                    },
                    value: {
                        uuid: "b75702a6-908d-491b-9399-6495712c81cc",
                        display: "EMERGENCY OCP"
                    },
                    groupMembers: null
                },
                {
                    uuid: "655fb051-499f-4240-9a1d-0dff5f8b5730",
                    obsDatetime: "2015-11-30T14:44:38.000+0300",
                    concept: {
                        uuid: "a899e6d8-1350-11df-a1f1-0026b9348838"
                    },
                    value: null,
                    groupMembers: [
                        {
                            uuid: "d168285f-636b-4558-aaf1-7036e4a49f80",
                            obsDatetime: "2015-11-30T14:44:38.000+0300",
                            concept: {
                                uuid: "a8a65e36-1350-11df-a1f1-0026b9348838"
                            },
                            value: 80,
                            groupMembers: null
                        },
                        {
                            uuid: "fcf67bd7-612a-48a3-9e8d-5097af648c05",
                            obsDatetime: "2015-11-30T14:44:38.000+0300",
                            concept: {
                                uuid: "a8a65fee-1350-11df-a1f1-0026b9348838"
                            },
                            value: 35,
                            groupMembers: null
                        }
                    ]
                },
                {
                    uuid: "655fb051-499f-4240-9a1d-0dff5f8b5730",
                    obsDatetime: "2015-11-30T14:44:38.000+0300",
                    concept: {
                        uuid: "a8a003a6y1350y11dfya1f1y0026b9348838"
                    },
                    value: null,
                    groupMembers: [
                        {
                            uuid: "d168285f-636b-4558-aaf1-7036e4a49f80",
                            obsDatetime: "2015-11-30T14:44:38.000+0300",
                            concept: {
                                uuid: "a8a07a48x1350x11dfxa1f1-0026b9348838"
                            },
                            value: 'testing repeating',
                            groupMembers: null
                        },
                        {
                            uuid: "fcf67bd7-612a-48a3-9e8d-5097af648c05",
                            obsDatetime: "2015-11-30T14:44:38.000+0300",
                            concept: {
                                uuid: "made-up-concept-4"
                            },
                            value: null,
                            groupMembers: [
                                {
                                    uuid: "d168285f-636b-4558-aaf1-7036e4a49f80",
                                    obsDatetime: "2015-11-30T14:44:38.000+0300",
                                    concept: {
                                        uuid: "made-up-concept-5"
                                    },
                                    value: "2015-11-30T14:44:38.000+0300",
                                    groupMembers: null
                                },
                                {
                                    uuid: "fcf67bd7-612a-48a3-9e8d-5097af648c05",
                                    obsDatetime: "2015-11-30T14:44:38.000+0300",
                                    concept: {
                                        uuid: "made-up-concept-6"
                                    },
                                    value: "2015-12-30T14:44:38.000+0300",
                                    groupMembers: null
                                }
                            ]
                        }
                    ]
                },
                {
                    uuid: "655fb051-499f-4240-9a1d-0dff5f8b5730",
                    obsDatetime: "2015-11-30T14:44:38.000+0300",
                    concept: {
                        uuid: "a8a003a6y1350y11dfya1f1y0026b9348838"
                    },
                    value: null,
                    groupMembers: [
                        {
                            uuid: "d168285f-636b-4558-aaf1-7036e4a49f80",
                            obsDatetime: "2015-11-30T14:44:38.000+0300",
                            concept: {
                                uuid: "a8a07a48x1350x11dfxa1f1-0026b9348838"
                            },
                            value: 'testing repeating 2 now',
                            groupMembers: null
                        },
                        {
                            uuid: "fcf67bd7-612a-48a3-9e8d-5097af648c05",
                            obsDatetime: "2015-11-30T14:44:38.000+0300",
                            concept: {
                                uuid: "made-up-concept-4"
                            },
                            value: null,
                            groupMembers: [
                                {
                                    uuid: "d168285f-636b-4558-aaf1-7036e4a49f80",
                                    obsDatetime: "2015-11-30T14:44:38.000+0300",
                                    concept: {
                                        uuid: "made-up-concept-5"
                                    },
                                    value: "2015-04-30T14:44:38.000+0300",
                                    groupMembers: null
                                },
                                {
                                    uuid: "fcf67bd7-612a-48a3-9e8d-5097af648c05",
                                    obsDatetime: "2015-11-30T14:44:38.000+0300",
                                    concept: {
                                        uuid: "made-up-concept-6"
                                    },
                                    value: "2015-05-30T14:44:38.000+0300",
                                    groupMembers: null
                                }
                            ]
                        }
                    ]
                },
                {
                    uuid: "d168285f-636b-4558-aaf1-7036e4a49f80",
                    obsDatetime: "2015-11-30T14:44:38.000+0300",
                    concept: {
                        uuid: "a8a65e36-1350-11df-a1f1-0026b9348838"
                    },
                    value: 80,
                    groupMembers: null
                },
                {
                    uuid: "fcf67bd7-612a-48a3-9e8d-5097af648c05",
                    obsDatetime: "2015-11-30T14:44:38.000+0300",
                    concept: {
                        uuid: "a8a65fee-1350-11df-a1f1-0026b9348838"
                    },
                    value: 35,
                    groupMembers: null
                },
                {
                    uuid: "29953cdb-d4e3-4024-9bb1-e1c0a7fca6ce",
                    obsDatetime: "2015-11-30T14:44:38.000+0300",
                    concept: {
                        uuid: "a8b02524-1350-11df-a1f1-0026b9348838"
                    },
                    value: {
                        uuid: "8b715fed-97f6-4e38-8f6a-c167a42f8923",
                        display: "KENYA NATIONAL HEALTH INSURANCE FUND"
                    },
                    groupMembers: null
                },
                {
                    uuid: "5e12a2f5-678b-4b1e-a646-23221bad8797",
                    obsDatetime: "2015-11-30T14:44:38.000+0300",
                    concept: {
                        uuid: "a8a65f12-1350-11df-a1f1-0026b9348838"
                    },
                    value: 50,
                    groupMembers: null
                },
                {
                    uuid: "51e18815-8032-4cb4-b2e8-8c561ee53093",
                    obsDatetime: "2015-11-30T14:44:38.000+0300",
                    concept: {
                        uuid: "a8a6619c-1350-11df-a1f1-0026b9348838"
                    },
                    value: 180,
                    groupMembers: null
                },
                {
                    uuid: "f26402b1-5226-4afd-a60c-c2ea096783c1",
                    obsDatetime: "2015-11-30T14:44:38.000+0300",
                    concept: {
                        uuid: "93aa3f1d-1c39-4196-b5e6-8adc916cd5d6"
                    },
                    value: {
                        uuid: "a89ad3a4-1350-11df-a1f1-0026b9348838",
                        display: "NOT APPLICABLE"
                    },
                    groupMembers: null
                },
                {
                    uuid: "aaaf883b-ba97-45ef-8b32-d37a48bb2342",
                    obsDatetime: "2015-11-30T14:44:38.000+0300",
                    concept: {
                        uuid: "a899a9f2-1350-11df-a1f1-0026b9348838"
                    },
                    value: {
                        uuid: "a899ac7c-1350-11df-a1f1-0026b9348838",
                        display: "NEVER MARRIED"
                    },
                    groupMembers: null
                },
                {
                    uuid: "2cc74686-92ba-49cc-af49-6f1a02e608ba",
                    obsDatetime: "2015-11-30T14:44:38.000+0300",
                    concept: {
                        uuid: "a8a65d5a-1350-11df-a1f1-0026b9348838"
                    },
                    value: 120,
                    groupMembers: null
                },
                {
                    uuid: "5d268f3a-a6c9-495a-bf15-605e94a7eb08",
                    obsDatetime: "2015-11-30T14:44:38.000+0300",
                    concept: {
                        uuid: "a89ff9a6-1350-11df-a1f1-0026b9348838"
                    },
                    value: {
                        uuid: "a89b6440-1350-11df-a1f1-0026b9348838",
                        display: "SCHEDULED VISIT"
                    },
                    groupMembers: null
                },
                {
                    uuid: "557a1246-b3a7-49d2-9f27-e1a6c1059496",
                    obsDatetime: "2015-11-30T14:44:38.000+0300",
                    concept: {
                        uuid: "a8a660ca-1350-11df-a1f1-0026b9348838"
                    },
                    value: 65,
                    groupMembers: null
                },
                {
                    uuid: "ccfba5fc-8202-4506-a2ab-7a9dd04569bb",
                    obsDatetime: "2015-11-30T14:44:38.000+0300",
                    concept: {
                        uuid: "a8af49d8-1350-11df-a1f1-0026b9348838"
                    },
                    value: {
                        uuid: "a899b42e-1350-11df-a1f1-0026b9348838",
                        display: "NO"
                    },
                    groupMembers: null
                }
            ]
        };


        FormentryUtilService.getTestEncounterData('xx', function(data) {
          restObs = data;
        },

        function(error) {
          $log.error(error);
        }
        );

        $scope.vm.anyFieldsInError = function (fields) {
            if (fields && fields.length !== 0) {
                var hasError = false;
                _.each(fields, function (field) {
                    if (field.formControl && field.formControl.$error && Object.keys(field.formControl.$error).length > 0) {
                        hasError = true;
                    }
                });
                return hasError;
            }
            return false;
        };

        $scope.vm.onSubmit = function () {
            $scope.vm.hasClickedSubmit = true;
            var obsPayload = FormEntry.getFormPayload($scope.vm.model);
            $log.debug('test payload', JSON.stringify(obsPayload));

            var personAttributePayload = FormEntry.getPersonAttributesPayload($scope.vm.model);
            $log.debug('test person attribute payload', JSON.stringify(personAttributePayload));
            var personAttributes=getMockPersonAttribute();
            FormEntry.updateExistingPersonAttributeToForm(personAttributes,$scope.vm.model);
        };
        //addExistingPersonAttributesToForm
        // var form = TestService.getCompiledForm();
        // $scope.vm.model = form.compiledSchema[0].compiledPage[0].sectionModel;

        $scope.vm.submitLabel = 'Save';

        _activate();
        function parseDate(value) {
            return $filter('date')(value || new Date(), 'yyyy-MM-dd HH:mm:ss', '+0300');
        }

        function setUpHistoricalData() {
             EncounterDataService.registerPreviousEncounters('prevEnc', restObs);
        }

        function _activate() {
            // $scope.vm.tabs =
            // [
            //   {
            //     title: 'Tab 1',
            //     active: true,
            //     form: {
            //       options: {},
            //       model: $scope.vm.model,
            //       fields: [
            //       {
            //         key: 'section_1',
            //         type: 'section',
            //         templateOptions: {
            //           label: 'Tarehe'
            //         },
            //         data: {
            //           fields: [
            //             {
            //                 key: 'encounterDate',
            //                 type: 'datetimepicker',
            //                 defaultValue: parseDate(new Date()),
            //                 templateOptions: {
            //                     type: 'text',
            //                     label: 'Tarehe',
            //                     // datepickerPopup: 'dd-MMM-yyyy HH:mm:ss'
            //                   }
            //               },
            //               {
            //                 key: 'email',
            //                 type: 'input',
            //                 templateOptions: {
            //                   label: 'Username',
            //                   type: 'email',
            //                   placeholder: 'Email address'
            //                 },
            //                 expressionProperties: {
            //                   'templateOptions.required': 'true'
            //                 },
            //               },
            //               {
            //                 key: 'marvel1',
            //                 type: 'select',
            //                 data:{concept:'a899e444-1350-11df-a1f1-0026b9348838'},
            //                 templateOptions: {
            //                   required:true,
            //                   label: 'Normal Select',
            //                   options: [
            //                     {name: 'Iron Man', value: 'iron_man'},
            //                     {name: 'Captain America', value: 'captain_america'},
            //                     {name: 'Black Widow', value: 'black_widow'},
            //                     {name: 'Hulk', value: 'hulk'},
            //                     {name: 'Captain Marvel', value: 'captain_marvel'}
            //                   ]
            //                 }
            //               }
            //             ]
            //         }
            //       },
            //       {
            //         key: 'other_Fields',
            //         type: 'section',
            //         templateOptions: {
            //           label: 'Other Fields'
            //         },
            //         data: {
            //           fields: [
            //             {
            //               key: 'town2',
            //               type: 'input',
            //               templateOptions: {
            //                 required: true,
            //                 type: 'text',
            //                 label: 'Test Town'
            //               }
            //             },
            //             {
            //               key: 'country2',
            //               type: 'input',
            //               templateOptions: {
            //                 required: true,
            //                 type: 'text',
            //                 label: 'Test Country'
            //               }
            //             }
            //           ]
            //         }
            //       }
            //     ]
            //     }
            //   },
            //   {
            //     title: 'Tab 2',
            //     form: {
            //       options: {},
            //       model: $scope.vm.model,
            //       fields: [
            //         {
            //           key: 'address',
            //           type: 'section',
            //           templateOptions: {
            //             label: 'Address'
            //           },
            //           data: {
            //             fields: [
            //               {
            //                 key: 'town',
            //                 type: 'input',
            //                 templateOptions: {
            //                   required: true,
            //                   type: 'text',
            //                   label: 'Town'
            //                 }
            //               },
            //               {
            //                 key: 'country',
            //                 type: 'input',
            //                 templateOptions: {
            //                   required: true,
            //                   type: 'text',
            //                   label: 'Country'
            //                 }
            //               }
            //             ]
            //           }
            //         }
            //       ]
            //     }
            //   },
            //   {
            //     "title": "Example From JJ",
            //     options: {},
            //     form: {
            //       model: $scope.vm.model,
            //       fields: form.compiledSchema[0].compiledPage[0].formlyFields
            //     }
            //   }
            // ];

        }

        function getMockPersonAttribute() {
            return [
                {
                    "uuid": "32c0399f-aa1f-48c0-99d8-9dbf691ed30e",
                    "attributeType": "8d87236c-c2cc-11de-8d13-0010c6dffd0f",
                    "name": "Health Center",
                    "value": {
                        "uuid": "08feb6b0-1352-11df-a1f1-0026b9348838",
                        "display": "Location-6",
                        "links": [
                            {
                                "uri": "NEED-TO-CONFIGURE/ws/rest/v1/location/08feb6b0-1352-11df-a1f1-0026b9348838",
                                "rel": "self"
                            }
                        ]
                    },
                    "size": 2
                },
                {
                    "uuid": "1ea516d7-95d2-4d24-9218-514e110c2ba6",
                    "attributeType": "72a76074-1359-11df-a1f1-0026b9348838",
                    "name": "Point of HIV Testing",
                    "value": {
                        "uuid": "a8a359a2-1350-11df-a1f1-0026b9348838",
                        "display": "PROVIDER INITIATED TESTING AND COUNSELING",
                        "links": [
                            {
                                "uri": "NEED-TO-CONFIGURE/ws/rest/v1/concept/a8a359a2-1350-11df-a1f1-0026b9348838",
                                "rel": "self"
                            }
                        ]
                    },
                    "size": 2
                }
            ];
        }
    }


}
    )();

/*
jshint -W098, -W003, -W068, -W004, -W033, -W030, -W117, -W069, -W106
*/
/*jscs:disable disallowMixedSpacesAndTabs, requireDotNotation, requirePaddingNewLinesBeforeLineComments, requireTrailingComma*/
(function() {
  'use strict';
  /**
   * @ngdoc function
   * @name angularFormentryApp.controller:AboutCtrl
   * @description
   * # AboutCtrl
   * Controller of the angularFormentryApp
   */
  angular
        .module('angularFormentry')
        .controller('EditorCtrl', RecursiveTestCtrl);

  RecursiveTestCtrl.$inject = ['$log', '$location', '$scope','FormEntry', '$timeout',
    '$filter','TestService', 'FormentryUtilService', '$rootScope', 'configService',
     'SearchDataService', 'EncounterDataService'
  ];

  function RecursiveTestCtrl($log, $location, $scope, FormEntry,
      $timeout, $filter, TestService, FormentryUtilService, $rootScope, configService,
      SearchDataService, EncounterDataService) {
    $scope.vm = {};
    $scope.vm.model = {};
    $scope.vm.questionMap = {};
    $scope.vm.hasClickedSubmit = false;
    $scope.vm.errors = [];
    var schema;
    var newForm;
    //  var testSchema = 'schema_encounter';
    var testSchema = 'editor';

    FormentryUtilService.getFormSchema(testSchema, function (data) {
        schema = data;

        //set up historical data for triage form
        // setUpHistoricalData();

        $log.info('Schema Controller', schema);
        var formObject = FormEntry.createForm(schema, $scope.vm.model);
        newForm = formObject.formlyForm;
        $log.debug('schema xxx', newForm);
        $scope.vm.tabs = newForm;
        $scope.vm.questionMap = formObject.questionMap;
        console.log('final question map', $scope.vm.questionMap);
        $scope.schema = angular.toJson(schema,true);
        $scope.vm.errors = formObject.error;
    });

    $scope.renderForm = function() {
      var schema = angular.fromJson($scope.schema);
      var payload = angular.fromJson($scope.payload);
      console.log(payload);
      var formObject = FormEntry.createForm(schema, $scope.vm.model);
      newForm = formObject.formlyForm;
      $log.debug('schema xxx', newForm);
      $scope.vm.tabs = newForm;
      $scope.vm.questionMap = formObject.questionMap;
      $log.log('Form Errors:', formObject.error);
      $scope.vm.errors = formObject.error;
    }

    $scope.updatePayload = function() {


    }

    function parseDate(value) {
      return $filter('date')(value || new Date(), 'yyyy-MM-dd HH:mm:ss', '+0300');
    }
  }
})();

/*
 jshint -W098, -W003, -W068, -W004, -W033, -W030, -W117, -W069, -W106
 */
/*jscs:disable disallowMixedSpacesAndTabs, requireDotNotation, requirePaddingNewLinesBeforeLineComments, requireTrailingComma*/
(function () {
  'use strict';
  /**
   * @ngdoc function
   * @name angularFormentryApp.controller:SimpleDemoCtrl
   * @module angularFormentry
   * @description
   * # SimpleDemoCtrl: has only 3 main fx : setAuthenticationHeaders, renderFormSchema and savePayload
   * Controller of the angularFormentry Developer DemoApp
   * This is a simple demo containing basic OpenMRS Angular Formentry Functionalities
   * We want you to have an easy time while you start consuming/using  OpenMRS Angular Formentry.
   * It contains basic feature --> for advanced features like field-handlers, historical auto-population see AdvancedDemoCtrl
   * Note that all logic have been implemented in one controller (for simplicity purposes): angular best practice guides in
   * development of real-world app requires these logic to be refactored to services/factories and directives
   */
  angular
    .module('angularFormentry')
    .controller('SimpleDemoCtrl', SimpleDemoCtrl);

  SimpleDemoCtrl.$inject = [
    '$log', '$scope', 'FormentryUtilService', 'FormEntry', '$resource', '$http', '$base64'
  ];

  function SimpleDemoCtrl($log, $scope, FormentryUtilService, FormEntry, $resource, $http, base64) {
    //form properties
    $scope.model = {};
    $scope.questionMap = {};
    $scope.selectedSchema = 'demo-triage'; //schema :: see openmrs-angularFormentry/app/scripts/formentry/schema/demo-triage.json

    //openMrs rest service base Url for ref app demo.openmrs.org
    $scope.openMrsRestServiceBaseUrl = 'http://demo.openmrs.org/openmrs/ws/rest/v1/'; //url

    //UX control flags
    $scope.showSuccessMsg = false; //flag to show/hide "form saved successfully" message --> replace it with angular-dialog-service
    $scope.errors = [];
    $scope.isBusy = false; //busy indicator flag -->replace it with (bower install angular-loading)

    //member functions
    $scope.setAuthenticationHeaders = setAuthenticationHeaders; //this method implements user authentication
    $scope.renderFormSchema = renderFormSchema; //this method  renders  form schema to the view
    $scope.submitForm = submitForm; //submits payload to the rest server *only creates encounter/obs
    $scope.savePayload = savePayload; //method that hits the rest api: returns a callback or fallback;
    $scope.init = init; //initializes the controller

    $scope.init(); //run the app

    /**
     * @ngdoc function init
     * @name init
     * @description
     * this function initializes the controller by calling authentication method and form schema rendering fx
     */
    function init() {
      //authenticate user
      $scope.setAuthenticationHeaders('admin', 'Admin123'); //-->replace this with a login page
      //render schema
      $scope.renderFormSchema();

    }

    /**
     * @ngdoc function
     * @name setAuthenticationHeaders
     * @param password
     * @param userName
     * @todo handle move this to a service or create login page
     * @description
     * function do do basic authentication: takes in userName, password
     */
    function setAuthenticationHeaders(userName, password) {
      //authenticate
      $log.log('authenticating user...');
      $http.defaults.headers.common.Authorization = 'Basic ' + base64.encode(userName + ':' + password);
    }

    /**
     * @ngdoc function
     * @name renderFormSchema
     * @description
     * this function renders form schema on the view
     */
    function renderFormSchema() {
      FormentryUtilService.getFormSchema($scope.selectedSchema, function (schema) {
        $scope.schema = angular.toJson(schema, true); //bind schema to scope
        var _schema = angular.fromJson(schema); //Deserializes form schema (JSON).
        var model = {};
        var formObject = FormEntry.createForm(_schema, model);
        var newForm = formObject.formlyForm;
        $scope.result = {
          "formObject": formObject,
          "newForm": newForm,
          "model": model
        };
        $scope.tabs = newForm;
        $scope.questionMap = formObject.questionMap;
        $scope.model = model;
        $scope.errors = formObject.error;
        $log.debug('schema --->', newForm);

      });
    }

    /**
     * @ngdoc function
     * @name submitForm
     * @todo handle provider, patient, location --> this should be moved to a service
     * @description
     * this function listens to save button --> it calls save payload function
     */
    function submitForm() {
      $scope.errors = []; //clear all errors
      $scope.isBusy = true; //busy indicator
      $scope.showSuccessMsg = false; //clear all success msg
      try {
        var payload = FormEntry.getFormPayload($scope.model);
        payload.provider = "fdf2bba3-ee9e-11e4-8e55-52540016b979"; //admin Admin123 (demo.openmrs.org)
        payload.encounterType = "67a71486-1a54-468f-ac3e-7091a9a79584"; //Vitals (demo.openmrs.org)
        payload.patient = "deb0905c-3b82-4631-88b2-b71425755cdf"; //Elizabeth Johnson (demo.openmrs.org)
        payload.location = "b1a8b05e-3542-4037-bbd3-998ee9c40574"; //Inpatient Ward (demo.openmrs.org)

        $log.debug('payload ---->', JSON.stringify(payload));
        $log.debug('model ---->', $scope.model);

        //hit the server
        savePayload(JSON.stringify(payload),
          onSuccessCallback, onErrorFailback);
      } catch (ex) {
        $scope.errors.push(ex);
      }
    };

    /**
     * @ngdoc function
     * @name onSuccessCallback
     * @param encounter
     * @callback successCallback
     * @callback errorCallback
     * @description
     * this functions hits the openMrs rest service: has a 2 callbacks (error and success)
     */
    function savePayload(encounter, successCallback, errorCallback) {
      $log.log('Submitting new obs...');

      var v = 'custom:(uuid,encounterDatetime,' +
        'patient:(uuid,uuid),form:(uuid,name),' +
        'location:ref,encounterType:ref,provider:ref,' +
        'obs:(uuid,obsDatetime,concept:(uuid,uuid),value:ref,groupMembers))';
      var encounterResource = $resource($scope.openMrsRestServiceBaseUrl + 'encounter/:uuid',
        {uuid: '@uuid', v: v},
        {query: {method: 'GET', isArray: false, cache: false}});

      encounterResource.save(encounter).$promise
        .then(function (data) {
          console.log('Encounter saved successfully');
          if (typeof successCallback === 'function')
            successCallback(data);
        })
        .catch(function (error) {
          console.log('Error saving encounter');
          if (typeof errorCallback === 'function')
            errorCallback(error);
        });
    }

    /**
     * @ngdoc function
     * @name onSuccessCallback
     * @params data
     * @description
     * this a success callback function for the savePayload function
     */
    function onSuccessCallback(data) {
      $log.log('Submitting new obs successful', data);
      $scope.showSuccessMsg = true;
      $scope.isBusy = false;
      //TODO: Display success popup
    }

    /**
     * @ngdoc function
     * @name onErrorFailback
     * @param error
     * @description
     * this an error callback function for the savePayload function
     */
    function onErrorFailback(error) {
      $log.error('Submitting new obs failed', error);
      //TODO: Handle errors
      $scope.errors.unshift(error);
      $scope.isBusy = false;

    }


  }
})();

/*
 jshint -W098, -W003, -W068, -W004, -W033, -W030, -W117, -W069, -W106
 */
/*jscs:disable disallowMixedSpacesAndTabs, requireDotNotation, requirePaddingNewLinesBeforeLineComments, requireTrailingComma*/
(function() {
    'use strict';
    /**
     * @ngdoc function
     * @name angularFormentryApp.controller:AboutCtrl
     * @description
     * # AboutCtrl
     * Controller of the angularFormentryApp
     */
    angular
        .module('angularFormentry')
        .controller('FormDesignerCtrl', FormDesignerCtrl);

    FormDesignerCtrl.$inject = [
        '$log', '$location', '$scope', '$rootScope',
        'CreateFormService',
        'FormDesignerService', 'FormentryUtilService', 'FormEntry'
    ];

    function FormDesignerCtrl($log, $location, $scope, $rootScope,
        CreateFormService, FormDesignerService, FormentryUtilService, FormEntry) {

        $scope.vm = {};
        //window.vm = $scope.vm;
        $scope.vm.model = {};
        $scope.vm.questionMap = {};
        $scope.vm.hasClickedSubmit = false;
        $scope.vm.errors = [];
        $scope.vm.existingForms = ["adult", "triage", "pedreturn"];
        $scope.vm.existingComponents = ["art","diagnosis","familyinformation","Feeding", "hivstatus", "hospitalization", 
        "immunization","intervalcomplaints","lab-results", "laborders", "labresults", "pcp-prophy", "pcpprop", 
        "pedsphysicalexam", "preclinicreview", "referral", "relationship", "sideeffect", "tb-prophy", 
        "tb-treatment", "tbproph", "tbtreatment", "vitals", "whostaging"];
        $scope.vm.selectedForm = "";

        $scope.renderExistingFormSchema = function() {
            FormentryUtilService.getFormSchema($scope.vm.selectedForm, function(schema) {
                $scope.schema =schema;
                
                if (_.isEmpty(schema.referencedForms)) {
                    $scope.renderForm();
                } else {
                    var referencedFormNames = [];
                    _.each(schema.referencedForms, function(reference) {
                        referencedFormNames.push(reference.formName);
                    });

                    FormentryUtilService.getFormSchemaReferences(referencedFormNames, function(formSchemas) {
                        FormEntry.compileFormSchema($scope.schema, formSchemas);
                        $scope.renderForm();
                    }, function(error) {
                        console.error('Could not load referenced forms', error);
                    });
                }
                // $scope.schema = angular.toJson(schema, true);
                // $scope.renderForm();
            });
        }

        $scope.renderExistingComponentSchema = function() {
            FormentryUtilService.getFormSchema("component_" + $scope.vm.selectedComponent,
                function(schema) {
                    $scope.schema = angular.toJson(schema, true);
                    $scope.renderForm();
                })

        }

        $scope.renderForm = function() {
            var schema = angular.fromJson($scope.schema);
            var payload = angular.fromJson($scope.payload);
            var result = FormDesignerService.renderForm(schema, payload);
            $scope.vm.result = result;
            $scope.vm.tabs = result.newForm;
            $scope.vm.questionMap = result.formObject.questionMap;
            $scope.vm.model = result.model;
            $scope.vm.errors = result.formObject.error;
        }

        $scope.updatePayload = function() {


        }

        function parseDate(value) {
            return $filter('date')(value || new Date(), 'yyyy-MM-dd HH:mm:ss', '+0300');
        }
    }
})();

/*
 jshint -W098, -W003, -W068, -W004, -W033, -W030, -W117, -W069, -W106, -W026
 jscs:disable disallowMixedSpacesAndTabs, requireDotNotation
 jscs:requirePaddingNewLinesBeforeLineComments, requireTrailingComma
 */
(function () {
  'use strict';

  angular
    .module('app.formDesigner')
    .factory('FormDesignerService', FormDesignerService);

  FormDesignerService.$inject = ["$log","FormEntry"];
  //FormDesignerService.$inject = ["EncounterDataService"];

  function FormDesignerService($log,FormEntry) {
  //function FormDesignerService() {

    var service = {
      renderForm: renderForm
    };

    //schema: json object converted from string
    //payload: json object converted from string
    function renderForm(schema,payload) {
      console.log(payload);
      var model = {};
      var formObject = FormEntry.createForm(schema, model);
      var newForm = formObject.formlyForm;
      $log.debug('schema xxx', newForm);
      return {
          "formObject":formObject,
          "newForm":newForm,
          "model":model
      };
    }


    return service;
  }
})();

(function() {
    'use strict';
    /**
     * @ngdoc function
     * @name app.openmrsFormManager.controller:OpenmrsFormManagerCtrl
     * @description
     * # OpenmrsFormManagerCtrl
     * Controller of the app.openmrsFormManager
     */
    
    angular
      .module('app.openmrsFormManager')
        .controller('OpenmrsFormManagerCtrl', OpenmrsFormManagerCtrl);

    OpenmrsFormManagerCtrl.$inject = [
        '$log',
        '$scope',
        '$rootScope',
        '$q',
        'FormResService',
        'dialogs',
        '$state',
        'AuthService',
        'CacheService'
    ];

    function OpenmrsFormManagerCtrl($log,$scope, $rootScope, $q, FormResService,
      dialogs, $state, AuthService, CacheService) {
        
        $scope.vm = {};
        $scope.vm.query = '';
        $scope.vm.busy = true;
        
        $scope.vm.maxSize = 2;
        
        $scope.vm.errors = [];
        $scope.vm.existingForms = null;
        $scope.vm.errorFetchingForms = false;
        $scope.vm.authenticated = AuthService.authenticated();
        
        if(AuthService.authenticated()) {
          $scope.vm.existingForms = _formatForms(CacheService.get('forms'));
          if(!$scope.vm.existingForms) {
            $rootScope.$broadcast('authenticated');
          } else {
            $scope.vm.busy = false;
          }
        }
        
        $scope.findDesiredForms = function() {
          $scope.vm.busy = true;
          var desired = {
            pocForms: FormResService.findPocForms('POC'),
            components: FormResService.findPocForms('Component')
          };
          
          $q.allSettled(desired).then(function(values) {
            var forms = values.pocForms.value;
            Array.prototype.push.apply(forms, values.components.value);
            CacheService.put('forms', forms);
            $scope.vm.existingForms = _formatForms(forms);
            $scope.vm.busy = false;
          })
          .catch(function(err) {
            $scope.vm.errorFetchingForms = err;
            $scope.vm.busy = false;
          });
        };
        
        $scope.$on('deauthenticated', function() {
          $scope.existingForms = null;
          $scope.vm.authenticated = false;
        });
        
        $scope.$on('authenticated', function(event, args) {
          $scope.findDesiredForms();
          $scope.vm.authenticated = true;
        }); 
        
        $scope.updateSchema = function(form) {
          var dialog = dialogs.confirm('Schema Exists', 'Schema already exists for ' 
            + form.name + '. Are you sure you want to upload a new one?');
          
          dialog.result.then(function(btn) {
            // User said Yes
            $scope.uploadSchema(form);
          });
        }
        
        $scope.uploadSchema = function(form) {
          form.busy = true;
          $log.debug(form.schema);
          
          var __saveFormResource = function(newResource) {
            FormResService.saveFormResource(form.uuid, newResource)
            .then(function(resource) {
              $log.debug('Resource updated successfully');
              newResource.uuid = resource.uuid;
              form.resources.push(newResource);
                              
              // Call format
              _formatSingleForm(form);
              form.busy = false;
              dialogs.notify('Success', 'Hooorah, it worked!');
            })
            .catch(function(err) {
              form.busy = false;
              $log.error('An error has occured', err);
              dialogs.error('Error!', 'Ooops! Troubles ' + err.message);
            });
          };
          
          FormResService.uploadFormResource(form.schema).then(function(data) {
            $log.debug('Returned from server:', data.data);
            
            // Upload resource info
            var existing = _findResource(form.resources, 'AmpathJsonSchema');
            if(existing !== null) {
              // Delete the existing resource
              FormResService.deleteFormResource(form.uuid, existing.uuid)
              .then(function() {
                $log.debug('Resource deleted, deleting schema');
                
                __saveFormResource({
                  name: existing.name || 'JSON schema',
                  dataType: existing.dataType || 'AmpathJsonSchema',
                  valueReference: data.data
                });
                
                FormResService.deleteFormSchemaByUuid(existing.valueReference)
                .then(function() {
                  $log.debug('Schema deleted, updating the form now');
                })
                .catch(function(err) {
                  $log.error('Error deleting schema ', err);
                });
              })
              .catch(function(err) {
                $log.error('Error deleting form resource with '
                        + 'uuid ' + existing.uuid, err);
              });
            } else {
              __saveFormResource({
                name: 'JSON schema',
                dataType: 'AmpathJsonSchema',
                valueReference: data.data
              }); 
            }
          })
          .catch(function(err) {
            form.busy = false;
            $log.error('didn\'t go well', err);
            dialogs.error('Error!', 'Oops! Could not upload schema');
          });
        }
        
        $scope.createForm = function() {
          $state.go('form-create', {relative:false});
        };

        $scope.viewForm = function(form) {
          $state.go('form-view', {formUuid: form.uuid,relative:false});
        }
        
        $scope.editForm = function(form) {
          $state.go('form-edit', {formUuid: form.uuid,relative: false});
        }
        
        function _formatForms(forms) {
          _.each(forms, function(form) {
            _formatSingleForm(form);
          });
          return forms;
        }
        
        function _formatSingleForm(form) {
          form.publishedText = form.published ? 'Yes' : 'No';
          form.publishedCssClass = form.published ? 'success': 'danger';
          form.schema = null;
          // Check whether it has resources
          if(form.resources && _findResource(form.resources)) {
            form.hasSchema = true;
            if(!form.published) {
              form.schemaAction = 'Update';
            }
          } else {
            form.hasSchema = false;
            form.schemaAction = 'Upload';
          }
          return form;
        }
        
        /**
         * Find a resource of a particular type in an array of resources.
         */
        function _findResource(formResources, resourceType) {
          var resourceType = resourceType || 'AmpathJsonSchema';
          if(_.isUndefined(formResources) || !Array.isArray(formResources)) {
            throw new Error('Argument should be array of form resources');
          }
          
          var found = _.find(formResources, function(resource) {
            return resource.dataType === resourceType;
          });
          
          if(found === undefined) return null;
          return found;
        }
    }
})();

(function() {
    'use strict';
    /**
     * @ngdoc function
     * @name angularFormentryApp.controller:CreateFormCtrl
     * @description
     * # CreateFormCtrl
     * Controller for creating a new form/form component
     */
    angular
        .module('app.openmrsFormManager')
        .controller('CreateFormCtrl', CreateFormCtrl);

    CreateFormCtrl.$inject = [
      '$scope',
      '$rootScope',
      'FormResService',
      'AuthService',
      'EncounterResService',
      '$log',
      'dialogs'
    ];
    
    function CreateFormCtrl($scope, $rootScope, FormResService, AuthService,
      encService, $log, dialogs) {
            
      $scope.$on('authenticated', function() {
        $scope.authenticated = true;
        $scope.busy = true;
        _addEncounterTypesOptionIfFound();
      });
      
      $scope.$on('deauthenticated', function() {
        $scope.authenticated = false;
      });
      
      $scope.options = {
        resetModel: function() {
          $scope.model = {};
        }
      };
      
      $scope.authenticated = AuthService.authenticated();
      
      $scope.model = {};
      
      // Fields 
      $scope.fields = [{
        key: 'name',
        type: 'input',
        templateOptions: {
          label: 'Form Name',
          required: true
        }
      }, {
        key: 'description',
        type: 'textarea',
        templateOptions: {
          label: 'Description'
        }
      }, {
        key: 'version',
        type: 'input',
        templateOptions: {
          label: 'Version',
          required: true
        }
      }, {
        key: 'published',
        type: 'checkbox',
        templateOptions: {
          label: 'Published'
        }
      }, {
        key: 'uploadFile',
        type: 'checkbox',
        templateOptions: {
          label: 'I want to upload schema file'
        }
      }, {
        key: 'jsonSchema',
        type: 'aceJsonEditor',
        hideExpression: 'model.uploadFile',
        templateOptions: {
          label: 'JSON Schema'
        }
      }, {
        key: 'fileSchema',
        type: 'fileUpload',
        hideExpression: '!model.uploadFile',
        templateOptions: {
          label: 'Schema file',
          required: true
        }
      }];
    
    $scope.busy = true;
    _addEncounterTypesOptionIfFound();
      
    $scope.create = function() {
      // check if schema is empty
      $scope.busySaving = true;
      if(($scope.model.uploadFile && !$scope.model.fileSchema) || 
              (!$scope.model.uploadFile && !$scope.model.jsonSchema)) {
        dialogs.notify('JSON Schema', 'You need either to choose a json '
         + 'schema file to upload or define the json schema in the editor '
         + 'provided');
         $scope.busySaving = false;
      } else {
        if($scope.model.uploadFile) {
          var schemaBlob = $scope.model.fileSchema;
        } else {
          //Entered as text
          var schemaBlob = new Blob($scope.model.jsonSchema, {type:'application/json'});
        }
        
        //Upload the schema file
        // TODO: Validate json schema
        $log.debug('Uploading schema: ', schemaBlob);
        FormResService.uploadFormResource(schemaBlob).then(function(response) {
          $log.debug('uuid of newly created json schema resource: ', response.data);
          var newForm = {
            name: $scope.model.name,
            version: $scope.model.version,
            published: $scope.model.published || false,
            description: $scope.model.description || ''
          };
          
          if($scope.model.encounterType) {
            newForm.encounterType = $scope.model.encounterType;
          }
          
          $log.debug('Now uploading the form details: ', newForm);
          FormResService.saveForm(newForm).then(function(createdForm) {
            $log.debug('Form created successfully', createdForm);
            
            var resource = {
              name: 'JSON schema',
              dataType: 'AmpathJsonSchema',
              valueReference: response.data
            }
            // Now saving the resource: This really sucks,
            $log.debug('Creating a resource for newly created form', resource);
            FormResService.saveFormResource(createdForm.uuid, resource)
            .then(function(resource) {
              $log.debug('clobdata, form and resource all created successfully');
              dialogs.notify('New Form', 'You got this! done successfully!');
              $scope.busySaving = false;
            })
            .catch(function(err) {
              $log.error('resource could not be created, this sucks because '
                        + 'the other two went through aaargh!');
              dialogs.error('Resource Creation Error',JSON.stringify(err,null,2));
              $scope.busySaving = false;
            });
          })
          .catch(function(err) {
            $log.error('Form details could not be posted, the resource has'
            + ' been posted though!', err);
            dialogs.error('Form Creation Error',JSON.stringify(err,null,2));
            $scope.busySaving = false;
          });
        })
        .catch(function(err) {
          $log.error('Error uploading file, form creation failed', err);
          dialogs.error('File Upload Error', JSON.stringify(err,null,2));
          $scope.busySaving = false;
        });
      }
    }
    
    function _addEncounterTypesOptionIfFound() {
      encService.getEncounterTypes().then(function(data) {
        $log.debug('Loaded types', data.results);
        var types = [{
          value:null,
          name: '--'
        }];
        _.each(data.results, function(type) {
          types.push({
            value: type.uuid,
            name: type.display
          });
        });
        
        var typesField = {
          key: 'encounterType',
          type: 'select',
          defaultValue: null,
          templateOptions: {
            label: 'Encounter Type',
            options: types
          }
        };
        $scope.fields.splice(3, 0, typesField);
        $scope.busy = false;
      })
      .catch(function(err) {
        $log.error('Error fetching encounter types ',err);
        $scope.busy = false;
      });
    }
      
  }
})();

(function(){
  'use strict';
  
  angular
    .module('app.openmrsFormManager')
      .controller('ViewEditFormCtrl', ViewEditFormCtrl);
  
  ViewEditFormCtrl.$inject = [
    '$scope',
    '$log',
    '$state',
    '$stateParams',
    '$q',
    'FormResService',
    'FormManagerUtil',
    'EncounterResService',
    'AuthService',
    'dialogs'
  ];
  
  function ViewEditFormCtrl($scope, $log, $state, $stateParams, $q, FormResService,
    FormManagerUtil, encService, AuthService, dialogs) {
    $log.debug('Loading form from openmrs for form uuid: ' + $stateParams.formUuid);
    
    $scope.authenticated = AuthService.authenticated();
    
    $scope.$on('authenticated', function() {
      $scope.authenticated = true;
      $scope.busy = true;
      _loadEncounterTypes();
    });
    
    $scope.$on('deauthenticated', function() {
      $scope.authenticated = false;
    });
    
    $scope.busy = true;
    $scope.hasError = false;
    $scope.errors = [];
    // Edit variables
    $scope.editForm = {};
    $scope.editForm.encounterTypes = [];
    $scope.editForm.uploadFile = false;
    
    // Load the form to be edited
    _initializeErrorAndBusyVariables();
    _loadForm($stateParams.formUuid);
    
    $scope.busy = true;
    //Load encounter types [Leave error details intact]
    _loadEncounterTypes();
    
    $scope.aceLoadedView = function(_editor) {
      _editor.setReadOnly(true);
    };  
    
    $scope.publishedChanged = function() {
      if($scope.editForm.published) {
        var title = 'Publishing';
        var message = 'Publishing the form will prevent any modifications '
                      + 'except for name & description.'
                      + ' Do you want to proceed?';
        
      } else {
        var title = 'Unpublishing';
        var message = 'Unpublished a form/component may introduce changes '
                    + 'that may screw the data collected using it.'
                    + ' Do you want to proceed?';
      }
      
      dialogs.confirm('Confirm ' + title, message).result.then(null, function(btn) {
        $scope.editForm.published = !$scope.editForm.published;
      });
    };
    
    $scope.saveChanges = function() {
      _initializeErrorAndBusyVariables();
      if($scope.editForm.schema.file) {
        var reader = new FileReader();
        reader.onload = function(event) {
          var fileContent = event.target.result;
          $log.debug('Done reading file: ', angular.fromJson(fileContent));
          __handleUpdates(_createPayloads(fileContent));
        };
        reader.readAsText($scope.editForm.schema.file);
      } else if($scope.editForm.schema.json) {
        $log.debug('Updating using schema entered as text in editor');
        __handleUpdates(_createPayloads($scope.editForm.schema.json));
      } else {
        // No schema business
        __handleUpdates(_createPayloads(null));
      }
      
      function __handleUpdates(payload) {
        if(payload.hasChanges) {
          _updateForm(payload);
        } else {
          $scope.busy = false;
          dialogs.notify('Updates', 'Nothing to update');
        }
      }
    };  
    
    $scope.changeViewToEdit = function() {
      $state.go('form-edit', {formUuid: $stateParams.formUuid,relative: false});
    };
    
    function _createPayloads(newJsonSchema) {
      var ret = {
        hasChanges: false,
        someFormFieldChanged: false,
        formPayload: {},
        schema: {
          action: false
        }
      };
      
      if($scope.form.name !== $scope.editForm.name) {
        ret.formPayload.name = $scope.editForm.name;
        ret.hasChanges = ret.someFormFieldChanged = true;
        
      }
      
      if($scope.form.description !== $scope.editForm.description) {
        ret.formPayload.description = $scope.editForm.description;
        ret.hasChanges = ret.someFormFieldChanged = true;
      }
      
      if($scope.form.published !== $scope.editForm.published) {
        ret.formPayload.published = $scope.editForm.published;
        ret.hasChanges = ret.someFormFieldChanged = true;
      }
      
      if(!$scope.form.published) {
        if($scope.form.version !== $scope.editForm.version) {
          ret.formPayload.version = $scope.editForm.version;
          ret.hasChanges = ret.someFormFieldChanged = true;
        }
        
        if($scope.form.encounterTypeUuid !== $scope.editForm.encounterTypeUuid) {
          ret.formPayload.encounterType = $scope.editForm.encounterTypeUuid;
          ret.hasChanges = ret.someFormFieldChanged = true;
        }
        
        // Deal with resource if changed. (Make sure you compare apples to apples)
        var ___updateSchemaStuff = function() {
          ret.hasChanges = true;
          if($scope.editForm.schema.file) {
            ret.schema.file = $scope.editForm.schema.file;
          } else {
            // Text passed
            ret.schema.file = new Blob([newJsonSchema], {type: 'application/json'});
          }
        }
        if(newJsonSchema) {
          if($scope.form.hasJsonSchema) {
            var oldSchema = angular.fromJson($scope.form.schema.json);
            var newSchema = angular.fromJson(newJsonSchema);
            $log.debug('Old schema:', oldSchema);
            $log.debug('New schema:', newSchema);
            
            if(!_.isEqual(oldSchema, newSchema)) {
              ___updateSchemaStuff.call(this);
              ret.schema.action = 'update';
              ret.jsonSchemaResource = {
                name: $scope.form.jsonSchemaResource.name || 'JSON schema',
                dataType: $scope.form.jsonSchemaResource.dataType || 'AmpathJsonSchema'
              }
            }
          } else {
            if($scope.editForm.schema.file || $scope.editForm.schema.json) {
              ___updateSchemaStuff.call(this);
              ret.schema.action = 'create';
              ret.jsonSchemaResource = {
                name: 'JSON schema',
                dataType: 'AmpathJsonSchema',
              };
            }
          }
        }
      }  
      return ret;
    }
    
    function _updateForm(payLoadData) {
      if(!payLoadData.hasChanges) return;
      
      var __updateResourceAndForm = function() {
        FormResService.uploadFormResource(payLoadData.schema.file)
        .then(function(response) {
          $log.debug('New new schema uploaded, now creating resource '
              + 'and uploading the updated form');
          payLoadData.jsonSchemaResource.valueReference = response.data;
          var promises = {};
          if(payLoadData.someFormFieldChanged) {
            $log.info('Form has some of fields modified');
            promises.form = FormResService.updateForm($scope.form.uuid,
                                                payLoadData.formPayload);
          }
          promises.formResource = FormResService.saveFormResource($scope.form.uuid,
                payLoadData.jsonSchemaResource);
          $q.allSettled(promises).then(function(values) {
            $log.debug('Reloading form after editing');
            _loadForm($scope.form.uuid);
          });
        })
        .catch(function(err) {
          $log.error('Error while updating form', err);
          $scope.hasError = true;
          $scope.errors.push = 'Error updating form, check the logs for details';
          $scope.busy = false;
        });
      };
      
      if(payLoadData.schema.action === 'update') {
        // Note: Because AmpathJsonSchema is not recognized as a valid dataType
        // in openmrs we have to remove the existing resource and create a new one
        $log.debug('Sending a request to delete schema with uuid ',
                            $scope.form.jsonSchemaResource.valueReference);
        FormResService.deleteFormSchemaByUuid($scope.form.jsonSchemaResource.valueReference)
        .finally(function() {
          $log.debug('We don\'t care about the outcome, now deleting '
            + 'form resource with uuid', $scope.form.jsonSchemaResource.uuid);
          FormResService.deleteFormResource($scope.form.uuid, $scope.form.jsonSchemaResource.uuid)
          .then(function(response) {
            // Upload new file
            $log.debug('Resource deleted, now uploading new schema: ',
              payLoadData.schema.file);
            __updateResourceAndForm();
          });
        })
        .catch(function(err) {
          $log.error('Error while updating form', err);
          $scope.hasError = true;
          $scope.errors.push = 'Error updating form, check the logs for details';
          $scope.busy = false;
        });
      } else if(payLoadData.schema.action === 'create') {
        __updateResourceAndForm();
      } else {
        //no action for schema
        FormResService.updateForm($scope.form.uuid, payLoadData.formPayload)
        .then(function(updatedForm) {
          $log.debug('Reloading form after editing');
          _loadForm($scope.form.uuid).then(function() {
            _displayUpdateSuccessDialog();
          });
        })
        .catch(function(err) {
          $log.error('Error while updating form', err);
          $scope.hasError = true;
          $scope.errors.push = 'Error updating form, check the logs for details';
          $scope.busy = false;
        });
      }
    }
    
    function _initializeErrorAndBusyVariables() {
      $scope.busy = true;
      $scope.hasError = false;
      $scope.errors = [];
    }
    
    function _loadForm(formUuid) {
      var __noFormResource = function() {
        $scope.form.schema.json = '';
        //Create a deep copy first
        var formCopy = angular.copy($scope.form);
        $scope.editForm = _.extend($scope.editForm, formCopy);
        formCopy = null;
        $scope.busy = false;
      }
      return FormResService.getFormByUuid({
        uuid: formUuid,
        v: 'full',
        caching: false
      }).then(function(form) {
        $log.debug('Fetched form: ', form);
        $scope.form = form;
        $scope.form.schema = null;
        if(form.published) {
          form.publishedText = 'Yes';
          form.publishedCssClass = 'success';
        } else {
          form.publishedText = 'No';
          form.publishedCssClass = 'danger';
        }
        if(form.resources) {
          $scope.form.schema = {};
          $log.debug('Finding json schema for form ' + form.name);
          var resource = FormManagerUtil.findResource(form.resources);
          if(resource === undefined) {
            $log.debug('Resource not found using "AmpathJsonSchema" dataType,'
             + ' trying name "JSON Schema" ');
             resource = FormManagerUtil.findResource(form.resources, 'JSON schema');
          }
          
          if(resource !== undefined) {
            $log.debug('Fetching the associated json schema with valueReference'
                   + resource.valueReference);
            $scope.form.schema = {
              uuid: resource.valueReference
            };
            $scope.form.hasJsonSchema = true;
            $scope.form.jsonSchemaResource = resource;
            FormResService.getFormSchemaByUuid(resource.valueReference)
            .then(function(schema) {
              $log.debug('Loaded schema', schema);
              $scope.form.schema.json = JSON.stringify(schema, null, 2);
              
              // Trying to get a deep copy from angular without its limitations
              var formCopy = angular.copy($scope.form);
              $scope.editForm = _.extend($scope.editForm, formCopy);
              formCopy = null;
              $scope.busy = false;
              return true;
            })
            .catch(function(err) {
              $log.error('Error occured while fetching schema with uuid ' 
                        + resource.valueReference, err);
              $scope.errors.push('Error fetching schema with uuid ' 
              + resource.valueReference);
              $scope.busy = false;
              $scope.hasError = true;
              throw err;
            })       
          } else {
            __noFormResource();
            return true;
          }
        } else {
          // No resources anyway
          __noFormResource()
          return true;
        } 
      })
      .catch(function(err) {
        $log.error('Error occured while fetching form uuid ' + formUuid);
        $scope.errors.push('Could not load form with uuid ' + formUuid);
        $scope.busy = false;
        $scope.hasError = true;
        throw err;
      });
    }
    
    function _loadEncounterTypes() {
      encService.getEncounterTypes().then(function(data) {
        $log.debug('Loaded types', data.results);
        $scope.editForm.encounterTypes = data.results;
        $scope.busy = false;
      })
      .catch(function(err) {
        $log.error('Error fetching encounter types ',err);
        $scope.busy = false;
      });
    }
    
    function _displayUpdateSuccessDialog() {
      dialogs.notify('Form Edits', 'Hoorraa! Form successfully updated');
    }
  }
})();

(function() {
  'use strict';
  
  angular
    .module('app.openmrsFormManager')
      .directive('serverUrlConfig', ServerUrlConfig);
  
  ServerUrlConfig.$inject = [
    '$window'
  ];
      
  function ServerUrlConfig($window) {
    return {
      restrict: 'E',
      controller: UrlConfigController,
      templateUrl: 'views/openmrs-form-manager/server-url-config.htm',
    }  
  }
  
  UrlConfigController.$inject = [
    '$rootScope',
    '$scope',
    '$http',
    '$base64',
    '$cookies',
    'OpenmrsSettings',
    'SessionResService',
    '$log',
    'AuthService',
    '$window'
  ]
  
  function UrlConfigController($rootScope, $scope, $http, $base64, $cookies,
    OpenmrsSettings, sessionService, $log, AuthService, $window) {
    var restSuffix = 'ws/rest/v1/';
    
    $scope.openmrsUrl = $window.localStorage.getItem('openmrsUrl');
    if($scope.openmrsUrl === null || $scope.openmrsUrl == undefined || 
       $scope.openmrsUrl === 'undefined') {
      $scope.openmrsUrl = '';
    }
    
    $scope.authResult = {
      authenticated: AuthService.authenticated(),
      hasError: false,
    }
    
    $scope.busy = false;
    
    // Enable/Disable authenticate button
    $scope.enableAuthButton = function() {
      return $scope.openmrsUrl && $scope.username && $scope.password;
    };
    
    $scope.authenticate = function() {
      $scope.busy = true;
      
      if($scope.openmrsUrl === null || $scope.openmrsUrl === 'undefined' || 
        $scope.openmrsUrl === '') {
        _setError(true, 'Please provide Openmrs server base URL');
        $scope.busy = false;
      } else {
        
        // Set credos
        _setCredentials($scope.username, $scope.password);
        
        // Store the passed url to localStorage
        $window.localStorage.setItem('openmrsUrl', $scope.openmrsUrl);
        
        // Set the passed in openmrs server Url
        if(!$scope.openmrsUrl.endsWith('/')) {
          var openmrsUrl = $scope.openmrsUrl + '/';
        } else {
          var openmrsUrl = $scope.openmrsUrl;
        }
        
        OpenmrsSettings.setCurrentRestUrlBase(openmrsUrl + restSuffix);
        // Try to get session
        sessionService.getSession(function(data) {
          $scope.authResult.authenticated = data.authenticated;
          AuthService.authenticated(data.authenticated);
          $cookies.put('sessionId',data.sessionId);
          
          // in case not authenticated
          if(!data.authenticated) {
            _setError(true, 'Invalid username and/or password')
          } else {
            // broadcast authentication event
            $rootScope.$broadcast('authenticated', data);
          }
          $scope.busy = false;
        }, function(err) {
          $scope.busy = false;
          _setError(true, 'Something went wrong, Check the logs for details')
          $scope.authResult.error = err;
          $log.error(err);
        });
      }  
    }; 
    
    $scope.logout = function() {
      sessionService.deleteSession(function(response) {
        $http.defaults.headers.common.Authorization = null;
        $scope.authResult.authenticated = false;
        $scope.authResult.hasError = false;
        AuthService.authenticated(false);
        $rootScope.$broadcast('deauthenticated');
      });
    }
    
    function _setCredentials(username, password) {
      $http.defaults.headers.common.Authorization = 'Basic ' + 
        $base64.encode(username + ':' + password);
    }
    
    function _setError(status, message) {
      $scope.authResult.hasError = status;
      $scope.authResult.message = message;
    }
    
  }
})();
