CREATE TABLE `item`
(
  `item_id` bigint UNIQUE PRIMARY KEY NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `input_label` varchar(255) NOT NULL,
  `input_id` bigint NOT NULL
);

CREATE TABLE `input`
(
  `input_id` bigint UNIQUE PRIMARY KEY NOT NULL,
  `input_name` varchar(255) NOT NULL,
  `input_type` ENUM ('boolean', 'text', 'number', 'checkbox', 'radio', 'select', 'slide', 'cursor', 'date', 'time', 'datetime') NOT NULL,
  `input_default` varchar(255),
  `input_required` tinyint,
  `input_min` int,
  `input_max` int,
  `input_step` int,
  `input_start_label` varchar(255),
  `input_end_label` varchar(255),
  `form_id` bigint NOT NULL
);

CREATE TABLE `form`
(
  `form_id` bigint UNIQUE PRIMARY KEY NOT NULL,
  `form_name` varchar(255) NOT NULL,
  `form_created_at` varchar(255) COMMENT 'When from created'
);

CREATE TABLE `treatment`
(
  `treatment_id` bigint UNIQUE PRIMARY KEY NOT NULL,
  `treatment_name` varchar(255) NOT NULL,
  `treatment_color` varchar(255) NOT NULL,
  `treatment_created_at` varchar(255) COMMENT 'When treatment created'
);

CREATE TABLE `regex`
(
  `regex_id` bigint UNIQUE PRIMARY KEY NOT NULL,
  `regex_name` varchar(255) NOT NULL,
  `treatment_id` bigint NOT NULL,
  `form_id` bigint NOT NULL,
  `regex_created_at` varchar(255) COMMENT 'When regex created'
);

CREATE TABLE `condition`
(
  `condition_id` bigint UNIQUE PRIMARY KEY NOT NULL,
  `condition_operator` ENUM ('or', 'and') NOT NULL,
  `condition_check` ENUM ('egal', 'superior', 'inferior', 'between', 'outside') NOT NULL,
  `condition_value_check` varchar(255) NOT NULL,
  `condition_optional_value_check` varchar(255),
  `regex_id` bigint NOT NULL
);

ALTER TABLE `item` ADD FOREIGN KEY (`input_id`) REFERENCES `input` (`input_id`);

ALTER TABLE `input` ADD FOREIGN KEY (`form_id`) REFERENCES `form` (`form_id`);

ALTER TABLE `regex` ADD FOREIGN KEY (`treatment_id`) REFERENCES `treatment` (`treatment_id`);

ALTER TABLE `regex` ADD FOREIGN KEY (`form_id`) REFERENCES `form` (`form_id`);

ALTER TABLE `condition` ADD FOREIGN KEY (`regex_id`) REFERENCES `regex` (`regex_id`);
